namespace Dinner.ViewModels.Admin
{
    using System;

    public class ChangeMaxOrdersViewModel
    {
        public int CourseId { get; set; }

        public DateTime Date { get; set; }

        public int MaxOrders { get; set; }
    }
}