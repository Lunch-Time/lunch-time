using System;
using System.Collections.Generic;

using Dinner.Entities.Statistic;
using Dinner.Storage.Repository;

namespace Dinner.Storage.Impl
{
    internal sealed class StatisticStorage : IStatisticStorage
    {
        private readonly IDataContextFactory dataContextFactory;

        public StatisticStorage(IDataContextFactory dataContextFactory)
        {
            this.dataContextFactory = dataContextFactory;
        }

        public IList<StatisticByCourseModel> GetStatisticByCourse(int companyID, DateTime fromDate, DateTime toDate)
        {
            IList<StatisticByCourseModel> result = new List<StatisticByCourseModel>();

            using (var dataContext = dataContextFactory.Create())
            {
                var statistics = dataContext.p_StatisticByCourse(companyID, fromDate, toDate);
                foreach (var stat in statistics)
                {
                    result.Add(new StatisticByCourseModel
                    {
                        CategoryID = stat.CategoryID,
                        CategoryName = stat.CategoryName,
                        CourseName = stat.CourseName,
                        CourseCount = stat.CourseCount ?? 0,
                        TotalPrice = (float) (stat.TotalPrice ?? 0)
                    });
                }
            }
            return result;
        }

        public IList<StatisticByCourseBuyoutModel> GetStatisticsByCourseBuyout(int companyID, DateTime fromDate, DateTime toDate)
        {
            IList<StatisticByCourseBuyoutModel> result = new List<StatisticByCourseBuyoutModel>();

            using (var dataContext = dataContextFactory.Create())
            {
                var statistics = dataContext.p_StatisticByCourseBuyout(companyID, fromDate, toDate);
                foreach (var stat in statistics)
                {
                    result.Add(new StatisticByCourseBuyoutModel
                    {
                        CategoryID = stat.CategoryID,
                        CategoryName = stat.CategoryName,
                        CourseName = stat.CourseName,
                        AvgLimit = (float)(stat.AvgLimit ?? 0),
                        AvgPercent = (float)(stat.AvgPercent ?? 0)
                    });
                }
            }
            return result;
        }

        public IList<StatisticByCourseDeficitModel> GetStatisticsByCourseDeficit(int companyID, DateTime fromDate, DateTime toDate)
        {
            IList<StatisticByCourseDeficitModel> result = new List<StatisticByCourseDeficitModel>();

            using (var dataContext = dataContextFactory.Create())
            {
                var statistics = dataContext.p_StatisticByCourseDeficit(companyID, fromDate, toDate);
                foreach (var stat in statistics)
                {
                    result.Add(new StatisticByCourseDeficitModel
                    {
                        ID = stat.ID,
                        CourseName = stat.CourseName,
                        CategoryID = stat.CategoryID,
                        CategoryName = stat.CategoryName,
                        Date = stat.Date,
                        Count = stat.Count ?? 0,
                        Limit = stat.Limit,
                        Percent = (float)(stat.Percent ?? 0),
                        Price = (float)stat.Price
                    });
                }
            }
            return result;
        }

        public IList<StatisticByDaysModel> GetStatisticByDays(int companyID, DateTime fromDate, DateTime toDate)
        {
            IList<StatisticByDaysModel> result = new List<StatisticByDaysModel>();

            using (var dataContext = dataContextFactory.Create())
            {
                var statistics = dataContext.p_StatisticByDays(companyID, fromDate, toDate);
                foreach (var stat in statistics)
                {
                    result.Add(new StatisticByDaysModel
                    {
                        Date = stat.Date,
                        UserCount = stat.UserCount ?? 0,
                        CourseCount = stat.CourseCount ?? 0,
                        TotalPrice = (float) (stat.TotalPrice ?? 0)
                    });
                }
            }
            return result;
        }

        public IList<StatisticByUsersModel> GetStatisticByUsers(int companyID, DateTime fromDate, DateTime toDate)
        {
            IList<StatisticByUsersModel> result = new List<StatisticByUsersModel>();

            using (var dataContext = dataContextFactory.Create())
            {
                var statistics = dataContext.p_StatisticByUsers(companyID, fromDate, toDate);
                foreach (var stat in statistics)
                {
                    result.Add(new StatisticByUsersModel
                    {
                        ID = stat.ID,
                        Name = stat.Name,
                        CourseCount = stat.CourseCount ?? 0,
                        DaysCount = stat.DaysCount ?? 0,
                        TotalPrice = (float)(stat.TotalPrice ?? 0)
                    });
                }
            }
            return result;
        }
    }
}
