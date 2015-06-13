namespace Dinner.ViewModels.Admin
{
    using System;

    public class AddCourseToMenuViewModel
    {
        public int CourseId { get; set; }

        public DateTime Date { get; set; }

        public int MaxOrders { get; set; }
    }
}