using System;

namespace Dinner.Entities.Statistic
{
    public class StatisticByCourseDeficitModel
    {
        public int ID { get; set; }

        public int CategoryID { get; set; }

        public string CategoryName { get; set; }

        public string CourseName { get; set; }

        public DateTime Date { get; set; } 

        public int Count { get; set; }

        public int Limit { get; set; }

        public float Percent { get; set; }

        public float Price { get; set; }
    }
}
