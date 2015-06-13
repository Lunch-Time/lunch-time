using System.Collections.Generic;
using System.IO;

using Dinner.Entities.Course;

namespace Dinner.Services
{
    public interface IImageService
    {
        CoursePictureModel GetPicture(int companyID, int courseID);
        CoursePictureModel GetThumbnail(int companyID, int courseID);
        IEnumerable<CoursePictureModel> GetPictures(int companyID, bool includeDeleted);
        
        void ClearCacheAndTemp();
        void UpdateCoursePicture(string tempPictureName, int companyID, int courseID);

        CoursePictureModel GetTempPicture(string tempID);
        string SavePictureToTemp(int companyID, int courseID, Stream stream);
        bool DeletePictureFromTemp(string tempPath);
        // byte[] GetPictureFromTemp(string tempPath);
    }
}
