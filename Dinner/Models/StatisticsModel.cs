using System;
using Dinner.Helpers;

namespace Dinner.Models
{
    public class StatisticsModel
    {
        public StatisticRecordsGroup[] StatisticGroups { get; set; }
    
        public StatisticsHelper.StatisticsType CurrentStatisticsType { get; set; }

        public string CurrentStatisticsName { get; set; }

        public StatisticsHelper.StatisticsType[] AvailableStatisticsTypes { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}