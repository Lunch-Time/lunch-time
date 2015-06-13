using System.ComponentModel.DataAnnotations;

namespace Dinner.Entities.Course
{
    public enum CourseCategories : int
    {
        [Display(Name = "Салаты")]
        Salads = 0,

        [Display(Name = "Супы")]
        Soups = 1,

        [Display(Name = "Основные блюда")]
        MainDishes = 2,

        [Display(Name = "Гарниры")]
        SideDishes = 3,

        [Display(Name = "Другое")]
        Misc = 4
    }
}