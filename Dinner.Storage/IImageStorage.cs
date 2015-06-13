using System.Collections.Generic;

using Dinner.Entities.Course;

namespace Dinner.Storage
{
    public interface IImageStorage
    {
        CoursePictureModel GetCoursePicture(int companyID, int courseID);
        IEnumerable<CoursePictureModel> GetCoursePictures(int companyID, bool includeDeleted);
        void UpdateCoursePicture(CoursePictureModel picture);
    }
}
