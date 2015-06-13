namespace Dinner.Models
{
    using System;

    public class OrderCourseModel
    {
        public int CourseId { get; set; }
        public float Quantity { get; set; }
        public DateTime Date { get; set; }
    }
}