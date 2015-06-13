namespace Dinner.Entities.Statistic
{
    public class StatisticByCourseBuyoutModel
    {
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string CourseName { get; set; }
        public float AvgLimit { get; set; }
        public float AvgPercent { get; set; }
    }
} 
 