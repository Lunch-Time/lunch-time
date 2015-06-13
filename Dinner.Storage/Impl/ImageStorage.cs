using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

using Dinner.Entities.Course;
using Dinner.Storage.Repository;

namespace Dinner.Storage.Impl
{
    internal class ImageStorage : IImageStorage
    {
        private readonly IDataContextFactory dataContextFactory;

        public ImageStorage(IDataContextFactory dataContextFactory)
        {
            this.dataContextFactory = dataContextFactory;
        }

        public CoursePictureModel GetCoursePicture(int companyID, int courseID)
        {
            CoursePictureModel result = null;
            using (var dataContext = this.dataContextFactory.Create())
            {
                var picture = dataContext.p_GetCoursePicture(companyID, courseID).FirstOrDefault();
                if (picture != null)
                {
                    result = new CoursePictureModel()
                    {
                        Picture = picture.Picture != null ? new MemoryStream(picture.Picture) : null,
                        CompanyID = picture.CompanyID,
                        CourseID = picture.ID
                    };
                }
            }
            return result;
        }

        public IEnumerable<CoursePictureModel> GetCoursePictures(int companyID, bool includeDeleted)
        {
            IList<CoursePictureModel> models = new List<CoursePictureModel>();
            using (var dataContext = this.dataContextFactory.Create())
            {
                var picture = dataContext.p_GetCoursePictures(companyID, includeDeleted).FirstOrDefault();
                if (picture != null)
                {
                    models.Add(new CoursePictureModel
                    {
                        CompanyID = picture.CompanyID,
                        CourseID = picture.ID,
                        Picture = picture.Picture != null ? new MemoryStream(picture.Picture) : null,
                    });
                }
            }
            return models;
        }

        public void UpdateCoursePicture(CoursePictureModel picture)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                dataContext.p_UpsertCoursePicture(picture.CompanyID, picture.CourseID, ReadToEnd(picture.Picture));
            }
        }

        private static byte[] ReadToEnd(Stream stream)
        {
            long originalPosition = 0;

            if (stream.CanSeek)
            {
                originalPosition = stream.Position;
                stream.Position = 0;
            }

            try
            {
                byte[] readBuffer = new byte[4096];

                int totalBytesRead = 0;
                int bytesRead;

                while ((bytesRead = stream.Read(readBuffer, totalBytesRead, readBuffer.Length - totalBytesRead)) > 0)
                {
                    totalBytesRead += bytesRead;

                    if (totalBytesRead == readBuffer.Length)
                    {
                        int nextByte = stream.ReadByte();
                        if (nextByte != -1)
                        {
                            byte[] temp = new byte[readBuffer.Length * 2];
                            Buffer.BlockCopy(readBuffer, 0, temp, 0, readBuffer.Length);
                            Buffer.SetByte(temp, totalBytesRead, (byte)nextByte);
                            readBuffer = temp;
                            totalBytesRead++;
                        }
                    }
                }

                byte[] buffer = readBuffer;
                if (readBuffer.Length != totalBytesRead)
                {
                    buffer = new byte[totalBytesRead];
                    Buffer.BlockCopy(readBuffer, 0, buffer, 0, totalBytesRead);
                }
                return buffer;
            }
            finally
            {
                if (stream.CanSeek)
                {
                    stream.Position = originalPosition;
                }
            }
        }
    }
}
