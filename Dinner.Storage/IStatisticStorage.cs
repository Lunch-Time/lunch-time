using System;
using System.Collections.Generic;

using Dinner.Entities.Statistic;

namespace Dinner.Storage
{
    public interface IStatisticStorage
    {
        IList<StatisticByCourseModel> GetStatisticByCourse(int companyID, DateTime fromDate, DateTime toDate);
        IList<StatisticByCourseBuyoutModel> GetStatisticsByCourseBuyout(int companyID, DateTime fromDate, DateTime toDate);
        IList<StatisticByCourseDeficitModel> GetStatisticsByCourseDeficit(int companyID, DateTime fromDate, DateTime toDate);
        IList<StatisticByDaysModel> GetStatisticByDays(int companyID, DateTime fromDate, DateTime toDate);
        IList<StatisticByUsersModel> GetStatisticByUsers(int companyID, DateTime fromDate, DateTime toDate);
    }
}
