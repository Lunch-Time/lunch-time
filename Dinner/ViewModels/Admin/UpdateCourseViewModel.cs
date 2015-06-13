namespace Dinner.ViewModels.Admin
{
    public class UpdateCourseViewModel
    {
        public int ID { get; set; }

        public int CompanyId { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public float Price { get; set; }

        public string Description { get; set; }

        public string Weight { get; set; }

        public string ImageId { get; set; }
    }
}