namespace Dinner.Entities.Statistic
{
    public class StatisticByCourseModel
    {
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string CourseName { get; set; }
        public int CourseCount { get; set; }
        public float TotalPrice { get; set; }
    }
}
