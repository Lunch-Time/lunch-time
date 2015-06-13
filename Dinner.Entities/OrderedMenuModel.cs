using Dinner.Entities.Course;

namespace Dinner.Entities
{
    public class OrderedMenuModel
    {
        public CourseModel Course { get; set; }
        public double Quantity { get; set; }
        public bool IsPurchased { get; set; }
    }
}
