using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dinner.Entities.Course
{
    public class CourseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public int CompanyID { get; set; }

        public CourseCategories CategoryType { get; set; }

        public string CategoryName { get; set; }

        [Required]
        [Display(Name = "Название")]
        public string Name { get; set; }

        [Required]
        [Range(1, double.MaxValue)]
        [Display(Name = "Цена")]
        public float Price { get; set; }

        [Display(Name = "Описание")]
        public string Description { get; set; }

        [Display(Name = "Выход")]
        public string Weight { get; set; }

        public int MaxOrders { get; set; }

        public float OrderedQuantity { get; set; }

        public int OrderItemID { get; set; }

        public int MenuItemID { get; set; }

        public short Boxindex { get; set; }

        public string TempImageName { get; set; }
    }
}