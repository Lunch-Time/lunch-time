using System;
using System.Web.Mvc;

using Dinner.Helpers;
using Dinner.Services;

namespace Dinner.Controllers
{
    using Dinner.Services.Security;

    [Authorize]
    public class StatisticsController : BaseController
    {
        private readonly IStatisticsService statisticsService;

        private readonly IDinnerPrincipalProvider principalProvider;

        private readonly StatisticsHelper statisticsHelper;

        public StatisticsController(IStatisticsService statisticsService, ICalendarService calendarService, IDinnerPrincipalProvider principalProvider)
            : base(calendarService)
        {
            this.statisticsService = statisticsService;
            this.principalProvider = principalProvider;
            this.statisticsHelper = new StatisticsHelper(statisticsService, principalProvider);
        }

        public ActionResult Index()
        {
            var now = DateTime.Now;

            var dateStart = now.AddDays(-21);
            var dateEnd = now.AddDays(10);
            var model =
                this.statisticsHelper.GetStatistics(
                    StatisticsHelper.StatisticsType.TotalCoursesOrdered,
                    dateStart,
                    dateEnd);

            return View(model);
        }

        public ActionResult Get(StatisticsHelper.StatisticsType statisticsType, DateTime from, DateTime to)
        {
            var result = this.statisticsHelper.GetStatistics(statisticsType, from, to);
            return Json(result);
        }
    }
}
