namespace Dinner.ViewModels
{
    public class CourseViewModel
    {
        public int ID { get; set; }

        public int CompanyID { get; set; }

        public int CategoryID { get; set; }

        public string Name { get; set; }
        
        public float Price { get; set; }

        public string Description { get; set; }

        public string Weight { get; set; }

        public int MaxOrders { get; set; }

        public float OrderedQuantity { get; set; }

        public int OrderItemID { get; set; }

        public short BoxIndex { get; set; }
    }
}