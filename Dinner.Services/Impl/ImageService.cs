using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

using Dinner.Entities.Course;
using Dinner.Entities.Exceptions;
using Dinner.Storage;

namespace Dinner.Services.Impl
{
    using Dinner.Infrastructure.Log;
    using Dinner.Infrastructure.Settings;

    internal class ImageService : IImageService
    {
        private readonly IImageStorage imageStorage;

        private readonly ISettings settings;

        private readonly IEventLog eventLog;

        private readonly ConcurrentDictionary<string, object> concurrentDictionary;

        public ImageService(IImageStorage imageStorage, ISettings settings, IEventLog eventLog)
        {
            this.imageStorage = imageStorage;
            this.settings = settings;
            this.eventLog = eventLog;
            this.concurrentDictionary = new ConcurrentDictionary<string, object>();

            if (!Directory.Exists(TempFolderPath))
            {
                Directory.CreateDirectory(TempFolderPath);
            }

            if (!Directory.Exists(CacheFolderPath))
            {
                Directory.CreateDirectory(CacheFolderPath);
            }
        }

        protected string RootTempFolder
        {
            get { return this.settings.GetValue<string>("TempFolder"); }
        }

        protected int MaxPictureWidthOrHeight
        {
            get { return this.settings.GetValue<int>("MaxPictureWidthOrHeight"); }
        }

        protected int ThumbnailPictureWidthOrHeight
        {
            get { return this.settings.GetValue<int>("ThumbnailPictureWidthOrHeight"); }
        }
        
        protected string TempFolderPath
        {
            get { return RootTempFolder + "temp\\"; }
        }

        protected string CacheFolderPath
        {
            get { return RootTempFolder + "cache\\"; }
        }

        public CoursePictureModel GetPicture(int companyID, int courseID)
        {
            CoursePictureModel result;
            if (IsPictureInCache(companyID, courseID))
            {
                result = GetPictureFromCache(companyID, courseID);
            }
            else
            {
                result = imageStorage.GetCoursePicture(companyID, courseID);
                if (result == null)
                {
                    throw new CourseNotFoundException();
                }

                object locker = GetOrAddConcurrentKey(companyID, courseID);
                lock (locker)
                {
                    if (!IsPictureInCache(companyID, courseID))
                    {
                        SavePictureToCache(result);
                    }
                }
            }
            return result;
        }

        public CoursePictureModel GetThumbnail(int companyID, int courseID)
        {
            CoursePictureModel result;
            if (IsPictureInCache(companyID, courseID))
            {
                result = GetThumbnailFromCache(companyID, courseID);
            }
            else
            {
                result = imageStorage.GetCoursePicture(companyID, courseID);
                if (result == null)
                {
                    throw new CourseNotFoundException();
                }

                object locker = GetOrAddConcurrentKey(companyID, courseID);
                lock (locker)
                {
                    if (!IsPictureInCache(companyID, courseID))
                    {
                        SavePictureToCache(result);
                    }
                    result = GetThumbnailFromCache(companyID, courseID);
                }
            }
            return result;
        }

        public IEnumerable<CoursePictureModel> GetPictures(int companyID, bool includeDeleted)
        {
            throw new NotImplementedException();
        }

        public CoursePictureModel GetTempPicture(string tempImageName)
        {
            CoursePictureModel result = null;
            string tempPath = GetTempPicturePath(tempImageName);
            Stream image = GetPictureFromTemp(tempPath);
            if (image != null)
            {
                result = new CoursePictureModel
                    {
                    Picture = image
                };
            }
            return result;
        }

        public void UpdateCoursePicture(string tempPictureName, int companyID, int courseID)
        {
            string tempPath = GetTempPicturePath(tempPictureName);
            Stream tempPicture = GetPictureFromTemp(tempPath);
            if (tempPicture == null)
            {
                throw new FileNotFoundException();
            }

            var model = new CoursePictureModel
                {
                CompanyID = companyID,
                CourseID = courseID,
                Picture = tempPicture
            };

            imageStorage.UpdateCoursePicture(model);

            object locker = GetOrAddConcurrentKey(companyID, courseID);
            lock (locker)
            {
                SavePictureToCache(model);
            }

            DeletePictureFromTemp(tempPath);
        }

        public string SavePictureToTemp(int companyID, int courseID, Stream stream)
        {
            string pictureName = string.Format("{0}.png", Guid.NewGuid().ToString());
            try
            {
                using (Image image1 = Image.FromStream(stream))
                {
                    using (Bitmap smallImage = ScaleImage(image1, MaxPictureWidthOrHeight, MaxPictureWidthOrHeight))
                    {
                        smallImage.Save(TempFolderPath + pictureName, ImageFormat.Png); 
                    }
                }
            }
            catch (Exception e)
            {
                this.eventLog.LogWarning(e);
            }

            return pictureName;
        }
        
        public bool DeletePictureFromTemp(string tempPath)
        {
            bool result = false;

            try
            {
                if (File.Exists(tempPath))
                {
                    File.Delete(tempPath);
                    result = true;
                }
            }
            catch (Exception e)
            {
                this.eventLog.LogWarning(e);
            }

            return result;
        }
        
        public void ClearCacheAndTemp()
        {
            // TODO
        }

        private Stream GetPictureFromTemp(string tempPath)
        {
            Stream result = null;
            try
            {
                if (File.Exists(tempPath))
                {
                    using (var fileStream = File.Open(tempPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                    {
                        result = new MemoryStream();
                        fileStream.CopyTo(result);
                    }
                }
            }
            catch (Exception e)
            {
                this.eventLog.LogWarning(e);
            }

            return result;
        }

        private Bitmap ScaleImage(Image image, int maxWidth, int maxHeight)
        {
            var ratioX = (double)maxWidth / image.Width;
            var ratioY = (double)maxHeight / image.Height;
            var ratio = Math.Min(Math.Min(ratioX, ratioY), 1);

            var newWidth = (int)(image.Width * ratio);
            var newHeight = (int)(image.Height * ratio);

            var newImage = new Bitmap(newWidth, newHeight);
            Graphics.FromImage(newImage).DrawImage(image, 0, 0, newWidth, newHeight);

            return newImage;
        }

        private bool IsPictureInCache(int companyID, int courseID)
        {
            bool result = false;
            string filePath = GetCacheFilePath(companyID, courseID);

            try
            {
                result = File.Exists(filePath);
            }
            catch (Exception e)
            {
                this.eventLog.LogWarning(e);
            }

            return result;
        }
        
        private CoursePictureModel GetPictureFromCache(int companyID, int courseID)
        {
            CoursePictureModel result = null;
            string filePath = GetCacheFilePath(companyID, courseID);
            try
            {
                if (!File.Exists(filePath))
                {
                    return null;
                }

                using (var fileStream = File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    var destination = new MemoryStream();
                    fileStream.CopyTo(destination);
                    result = new CoursePictureModel
                    {
                        CompanyID = companyID,
                        CourseID = courseID,
                        Picture = destination
                    };
                }
            }
            catch (Exception e)
            {
                this.eventLog.LogWarning(e);
            }

            return result;
        }

        private CoursePictureModel GetThumbnailFromCache(int companyID, int courseID)
        {
            CoursePictureModel result = null;
            string filePath = GetCacheThumbnailPath(companyID, courseID);
            try
            {
                if (!File.Exists(filePath))
                {
                    return null;
                }

                using (var fileStream = File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    var destination = new MemoryStream();
                    fileStream.CopyTo(destination);
                    result = new CoursePictureModel
                    {
                        CompanyID = companyID,
                        CourseID = courseID,
                        Picture = destination
                    };
                }
            }
            catch (Exception e)
            {
                this.eventLog.LogWarning(e);
            }

            return result;
        }

        private bool SavePictureToCache(CoursePictureModel picture)
        {
            bool result = false;
            try
            {
                string directory = GetCompanyCacheDirectory(picture.CompanyID);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                // save big picture
                string filePath = GetCacheFilePath(picture.CompanyID, picture.CourseID);
                SaveFile(filePath, picture.Picture);

                // save thumbnail picture
                string thumbnailPath = GetCacheThumbnailPath(picture.CompanyID, picture.CourseID);
                ResizeAndSaveFile(thumbnailPath, ThumbnailPictureWidthOrHeight, picture.Picture);

                result = true;
            }
            catch (Exception e)
            {
                this.eventLog.LogWarning(e);
            }

            return result;
        }

        private void SaveFile(string filePath, Stream picture)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            if (picture != null)
            {
                using (var fileStream = File.Create(filePath))
                {
                    picture.Position = 0;
                    picture.CopyTo(fileStream);
                }
            }
        }

        private void ResizeAndSaveFile(string filePath, int newSize, Stream picture)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            // save thumbnail picture
            if (picture != null)
            {
                picture.Position = 0;
                using (Image image1 = Image.FromStream(picture))
                {
                    Bitmap image2 = ScaleImage(image1, newSize, newSize);
                    image2.Save(filePath, ImageFormat.Png);
                    image2.Dispose();
                }
            }
        }

        private string GetCacheFilePath(int companyID, int courseID)
        {
            return string.Format("{0}{1}\\{2}.png", CacheFolderPath, companyID, courseID);
        }

        private string GetCacheThumbnailPath(int companyID, int courseID)
        {
            return string.Format("{0}{1}\\{2}.thumbnail.png", CacheFolderPath, companyID, courseID);
        }

        private string GetCompanyCacheDirectory(int companyID)
        {
            return string.Format("{0}{1}", CacheFolderPath, companyID);
        }
        
        private string GetTempPicturePath(string tempPictureName)
        {
            return string.Format("{0}{1}", TempFolderPath, tempPictureName);
        }

        private object GetOrAddConcurrentKey(int companyID, int courseID)
        {
            string key = string.Format("{0}_{1}", companyID, courseID);
            return concurrentDictionary.GetOrAdd(key, new object());
        }
    }
}
