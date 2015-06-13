using Dinner.Entities.Company;
using Dinner.Entities.Course;

namespace Dinner.Models
{
    using System;
    using System.Collections.Generic;

    public class MenuModel
    {
        public DateTime Date { get; set; }
        public IEnumerable<CourseModel> MenuCourses { get; set; }
        public CompanySettingsModel CompanySettings { get; set; }
    }
}