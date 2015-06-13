using Dinner.Entities.Course;

namespace Dinner.Services
{
    using System.Collections.Generic;

    using Dinner.Entities;

    public interface ICourseService
    {
        IEnumerable<CourseModel> GetCourses();
        
        void RemoveCourse(int courseId);

        CourseModel AddCourse(string name, string description, float price, string category, string weight);

        CourseModel UpdateCourse(CourseModel course);
    }
}