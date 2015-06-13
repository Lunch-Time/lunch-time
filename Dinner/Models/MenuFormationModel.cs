using Dinner.Entities.Course;

namespace Dinner.Models
{
    using System;
    using System.Collections.Generic;

    using Dinner.Entities;

    public class MenuFormationModel
    {
        public DateTime Date { get; set; }

        public IEnumerable<CourseModel> MenuCourses { get; set; }

        public IEnumerable<CourseModel> AvailableCourses { get; set; }
    }
}