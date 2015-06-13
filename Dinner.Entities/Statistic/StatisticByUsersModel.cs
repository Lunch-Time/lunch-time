namespace Dinner.Entities.Statistic
{
    public class StatisticByUsersModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int CourseCount { get; set; }
        public int DaysCount { get; set; }
        public float TotalPrice { get; set; }
    }
}
