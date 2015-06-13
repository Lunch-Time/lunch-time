using System;

namespace Dinner.Entities.MenuItem
{
    public class MenuItemWishModel
    {
        public int MenuItemWishID { get; set; }

        public int CustomerUserID { get; set; }

        public int MenuItemID { get; set; }

        public DateTime Date { get; set; }

        public int CourseID { get; set; }

        public string CourseName { get; set; }

        public int CourseCategoryID { get; set; }

        public string CourseCategoryName { get; set; }
    }
}
