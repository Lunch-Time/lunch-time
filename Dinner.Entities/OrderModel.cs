using System;
using System.Collections.Generic;

using Dinner.Entities.Company;
using Dinner.Entities.Course;

namespace Dinner.Entities
{
    public class OrderModel
    {
        public bool IsFreezed { get; set; }

        public TimeSpan FreezeTime { get; set; }

        public DateTime Date { get; set; }

        public IEnumerable<int> WishedCourses { get; set; }

        public IEnumerable<CourseModel> AvailableCourses { get; set; }

        public IEnumerable<OrderedMenuModel> OrderedMenus { get; set; }

        public CompanySettingsModel CompanySettings { get; set; }
    }
}