using System;
using System.Collections.Generic;
using Dinner.Entities.Statistic;

namespace Dinner.Services
{
    public interface IStatisticsService
    {
        IList<StatisticByCourseModel> GetStatisticsByCourse(DateTime start, DateTime end);
        IList<StatisticByCourseBuyoutModel> GetStatisticsByCourseBuyout(DateTime start, DateTime end);
        IList<StatisticByCourseDeficitModel> GetStatisticsByCourseDeficit(DateTime start, DateTime end);
        IList<StatisticByDaysModel> GetStatisticsByDay(DateTime start, DateTime end);
        IList<StatisticByUsersModel> GetStatisticsByUser(DateTime start, DateTime end);
    }
}
