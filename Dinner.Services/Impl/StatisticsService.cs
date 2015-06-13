using System;
using System.Collections.Generic;

using Dinner.Entities.Statistic;
using Dinner.Services.Security;
using Dinner.Storage;

namespace Dinner.Services.Impl
{
    public class StatisticsService : IStatisticsService
    {
        private readonly IDinnerPrincipalProvider principalProvider;

        private readonly IStatisticStorage statisticStorage;

        public StatisticsService(IDinnerPrincipalProvider principalProvider, IStatisticStorage statisticStorage)
        {
            this.principalProvider = principalProvider;
            this.statisticStorage = statisticStorage;
        }

        private DinnerPrincipal Principal
        {
            get { return this.principalProvider.Principal; }
        }

        public IList<StatisticByCourseModel> GetStatisticsByCourse(DateTime fromDate, DateTime toDate)
        {
            return this.statisticStorage.GetStatisticByCourse(Principal.CompanyID, fromDate, toDate);
        }

        public IList<StatisticByCourseBuyoutModel> GetStatisticsByCourseBuyout(DateTime fromDate, DateTime toDate)
        {
            return this.statisticStorage.GetStatisticsByCourseBuyout(Principal.CompanyID, fromDate, toDate);
        }

        public IList<StatisticByCourseDeficitModel> GetStatisticsByCourseDeficit(DateTime fromDate, DateTime toDate)
        {
            return this.statisticStorage.GetStatisticsByCourseDeficit(Principal.CompanyID, fromDate, toDate);
        }

        public IList<StatisticByDaysModel> GetStatisticsByDay(DateTime fromDate, DateTime toDate)
        {
            return this.statisticStorage.GetStatisticByDays(Principal.CompanyID, fromDate, toDate);
        }

        public IList<StatisticByUsersModel> GetStatisticsByUser(DateTime fromDate, DateTime toDate)
        {
            return this.statisticStorage.GetStatisticByUsers(Principal.CompanyID, fromDate, toDate);
        }
    }
}
