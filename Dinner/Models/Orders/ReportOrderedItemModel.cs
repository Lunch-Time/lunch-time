using Dinner.Entities.Course;

namespace Dinner.Models.Orders
{
    public class ReportOrderedItemModel
    {
        public CourseModel Course { get; set; }
        public double ResidueQuantity { get; set; }
        public double PurchasedQuantity { get; set; }
    }
}