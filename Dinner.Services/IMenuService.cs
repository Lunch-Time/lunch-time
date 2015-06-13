using Dinner.Entities;
using Dinner.Entities.Course;
using Dinner.Entities.MenuItem;

namespace Dinner.Services
{
    using System;
    using System.Collections.Generic;

    public interface IMenuService
    {
        IEnumerable<CourseModel> GetDayMenu(DateTime date);
        
        int AddOrUpdateCourseToMenu(int courseId, DateTime date, int limit);

        void RemoveCourseFromMenu(int courseId, DateTime date);
    }
}