using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Security.Authentication;
using Dinner.Models;
using Dinner.Services;

namespace Dinner.Helpers
{
    using Dinner.Services.Security;

    public class StatisticsHelper
    {
        private readonly IStatisticsService statisticsService;

        private readonly IDinnerPrincipalProvider principalProvider;

        public StatisticsHelper(IStatisticsService statisticsService, IDinnerPrincipalProvider principalProvider)
        {
            this.statisticsService = statisticsService;
            this.principalProvider = principalProvider;
        }

        public enum StatisticsType : int
        {
            [Display(Name = "Процент выкупа блюд")]
            CoursesBuyout,

            [Display(Name = "Дефицитные блюда")]
            CoursesDeficit,

            [Display(Name = "Блюдо : Количество заказов")]
            TotalCoursesOrdered,

            [AdminOnly]
            [Display(Name = "Блюдо : Общая цена заказов")]
            TotalPriceOfCoursesOrdered,

            [Display(Name = "День : Количество заказов")]
            UsersByDays,
            
            [Display(Name = "День : Общее число заказов")]
            CoursesByDays,

            [AdminOnly]
            [Display(Name = "День: Общая стоимость заказов")]
            TotalPriceByDays,

            [AdminOnly]
            [Display(Name = "Пользователь : Количество заказанных блюд")]
            TotalCoursesByUser,

            [AdminOnly]
            [Display(Name = "Пользователь : Общая стоимость заказанных блюд")]
            TotalPriceByUser,

            [AdminOnly]
            [Display(Name = "Пользователь: Количество дней с заказами")]
            DaysByUser
        }

        internal StatisticsType[] GetAvailableStatisticsTypes(bool isAdmin)
        {
            if (!isAdmin)
            {
                var attributeType = typeof(AdminOnlyAttribute);
                return typeof(StatisticsType).GetFields(BindingFlags.Public | BindingFlags.Static)
                                              .Where(field => !field.IsDefined(attributeType, false))
                                              .Select(field => (StatisticsType) field.GetValue(null))
                                              .ToArray();
            }
            else
            {
               return (StatisticsType[])Enum.GetValues(typeof(StatisticsType));
            }
        }

        internal StatisticsModel GetStatistics(StatisticsType statisticsType, DateTime dateStart, DateTime dateEnd)
        {
            var isAdmin = this.principalProvider.Principal.IsInRole("Admin");
            var availableStatistics = GetAvailableStatisticsTypes(isAdmin);

            if (!availableStatistics.Contains(statisticsType))
            {
                throw new AuthenticationException();
            }

            var model = new StatisticsModel()
                {
                    AvailableStatisticsTypes = availableStatistics,
                    CurrentStatisticsType = statisticsType,
                    CurrentStatisticsName = statisticsType.DisplayName(),
                    StartDate = dateStart,
                    EndDate = dateEnd.AddDays(-1)
                };
            IEnumerable<StatisticRecordsGroup.Record> statisticRecords = new StatisticRecordsGroup.Record[] { };

            bool hasCategories = false;
            switch (statisticsType)
            {
                case StatisticsType.CoursesBuyout:
                    statisticRecords = statisticsService.GetStatisticsByCourseBuyout(dateStart, dateEnd)
                                                        .Select(x => new StatisticRecordsGroup.Record()
                                                        {
                                                            Title = x.CourseName,
                                                            Value = x.AvgPercent * 100,
                                                            CategoryName = x.CategoryName
                                                        });
                    hasCategories = true;
                    break;
                case StatisticsType.CoursesDeficit:
                    statisticRecords = statisticsService.GetStatisticsByCourseDeficit(dateStart, dateEnd)
                                                        .Select(x => new StatisticRecordsGroup.Record()
                                                        {
                                                            Title = x.CourseName,
                                                            Value = x.Percent * 100,
                                                            CategoryName = x.CategoryName
                                                        });
                    hasCategories = true;
                    break;
                case StatisticsType.TotalCoursesOrdered:
                    statisticRecords = statisticsService.GetStatisticsByCourse(dateStart, dateEnd)
                                                        .Select(x => new StatisticRecordsGroup.Record()
                                                            {
                                                                Title = x.CourseName,
                                                                Value = (int) x.CourseCount,
                                                                CategoryName = x.CategoryName
                                                            });
                    hasCategories = true;
                    break;
                case StatisticsType.TotalPriceOfCoursesOrdered:
                    statisticRecords = statisticsService.GetStatisticsByCourse(dateStart, dateEnd)
                                                        .Select(x => new StatisticRecordsGroup.Record()
                                                            {
                                                                Title = x.CourseName,
                                                                Value = (int) x.TotalPrice,
                                                                CategoryName = x.CategoryName
                                                            });
                    hasCategories = true;
                    break;
                case StatisticsType.UsersByDays:
                    statisticRecords = statisticsService.GetStatisticsByDay(dateStart, dateEnd)
                                                        .Select(x => new StatisticRecordsGroup.Record()
                                                            {
                                                                Title = x.Date.ToShortDateString(),
                                                                Value = (int) x.UserCount
                                                            });
                    break;
                case StatisticsType.CoursesByDays:
                    statisticRecords = statisticsService.GetStatisticsByDay(dateStart, dateEnd)
                                                        .Select(x => new StatisticRecordsGroup.Record()
                                                            {
                                                                Title = x.Date.ToShortDateString(),
                                                                Value = (int) x.CourseCount
                                                            });
                    break;
                case StatisticsType.TotalPriceByDays:
                    statisticRecords = statisticsService.GetStatisticsByDay(dateStart, dateEnd)
                                                        .Select(x => new StatisticRecordsGroup.Record()
                                                            {
                                                                Title = x.Date.ToShortDateString(),
                                                                Value = (int) x.TotalPrice
                                                            });
                    break;
                case StatisticsType.TotalCoursesByUser:
                    statisticRecords = statisticsService.GetStatisticsByUser(dateStart, dateEnd)
                                                        .Select(x => new StatisticRecordsGroup.Record()
                                                            {
                                                                Title = x.Name,
                                                                Value = (int) x.CourseCount
                                                            });
                    break;
                case StatisticsType.TotalPriceByUser:
                    statisticRecords = statisticsService.GetStatisticsByUser(dateStart, dateEnd)
                                                        .Select(x => new StatisticRecordsGroup.Record()
                                                            {
                                                                Title = x.Name,
                                                                Value = (int) x.TotalPrice
                                                            });
                    break;
                case StatisticsType.DaysByUser:
                    statisticRecords = statisticsService.GetStatisticsByUser(dateStart, dateEnd)
                                                        .Select(x => new StatisticRecordsGroup.Record()
                                                            {
                                                                Title = x.Name,
                                                                Value = (int) x.DaysCount
                                                            });
                    break;
                default:
                    break;
            }

            model.StatisticGroups = GetStatisticsGroups(statisticRecords.ToArray(), hasCategories).ToArray();

            return model;
        }

        private IEnumerable<StatisticRecordsGroup> GetStatisticsGroups(
                                                          StatisticRecordsGroup.Record[] statisticRecords,
                                                          bool hasCategories)
        {
            if (hasCategories)
            {
                var groups = statisticRecords.GroupBy(x => x.CategoryName);
                return groups.SelectMany(x => CreateStatisticGroups(x.ToArray(), x.Key));
            }
            else
            {
                return CreateStatisticGroups(statisticRecords, string.Empty);
            }
        }

        private IEnumerable<StatisticRecordsGroup> CreateStatisticGroups(
                                                                       StatisticRecordsGroup.Record[] records,
                                                                       string groupName)
        {
            var groups = Split(records, 25).ToArray();
            var maxValue = (int)Math.Ceiling(records.Max(v => v.Value));

            var hasSeveralParts = groups.Count() > 1;

            return
                groups.Select(
                    (x, i) =>
                        {
                            var groupEntries = x.ToArray();
                            return new StatisticRecordsGroup()
                                {
                                    GroupName =
                                        !hasSeveralParts
                                            ? groupName
                                            : string.Format("{0} (часть {1})", groupName, i + 1),
                                    Records = groupEntries,
                                    MaxYAxisValue = maxValue
                                };
                        });
        }

        // http://stackoverflow.com/questions/1349491/how-can-i-split-an-ienumerablestring-into-groups-of-ienumerablestring
        private IEnumerable<IEnumerable<T>> Split<T>(IEnumerable<T> source, int chunkSize)
        {
            return source.Where((x, i) => i % chunkSize == 0).Select((x, i) => source.Skip(i * chunkSize).Take(chunkSize));
        }

        public class AdminOnlyAttribute : Attribute
        {
        }
    }
}