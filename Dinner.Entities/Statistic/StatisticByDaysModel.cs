using System;

namespace Dinner.Entities.Statistic
{
    public class StatisticByDaysModel
    {
        public DateTime Date { get; set; }
        public int UserCount { get; set; }
        public int CourseCount { get; set; }
        public float TotalPrice { get; set; }
    }
}
