using System.IO;

namespace Dinner.Entities.Course
{
    public class CoursePictureModel
    {
        public int CompanyID { get; set; }

        public int CourseID { get; set; }

        public Stream Picture { get; set; }
    }
}