namespace Dinner.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Mvc;

    using Dinner.Entities;
    using Dinner.Models;
    using Dinner.Services;

    public class TimingController : BaseController
    {
        public TimingController(ICalendarService calendarService)
            : base(calendarService)
        {
        }

        public ActionResult Index(string dateString)
        {
/*            var date = this.GetMenuDate(dateString);
            var timings = this.TimingService.GetDayTiming(date);
            var dinnerTime = this.TimingService.GetDinnerTime(date);
            var isFreezed = date.Date < DateTime.Now.Date;
            var viewModel = new UserTimingsModel { DinnerTime = dinnerTime, Timings = timings, IsFreezed = isFreezed };
            return this.View(viewModel);*/
            var viewModel = new UserTimingsModel() { Date = DateTime.Now };
            return this.View(viewModel);
        }

        public ActionResult ChangeTime(DateTime date, int? hour, int? minutes)
        {
            var data = new[]
                {
                    new TimingModel { Time = new TimeSpan(12, 0, 0), Count = 10 },
                    new TimingModel { Time = new TimeSpan(12, 30, 0), Count = 20 },
                    new TimingModel { Time = new TimeSpan(12, 40, 0), Count = 15 },
                    new TimingModel { Time = new TimeSpan(12, 50, 0), Count = 15 },
                    new TimingModel { Time = new TimeSpan(13, 10, 0), Count = 10 },
                    new TimingModel { Time = new TimeSpan(13, 20, 0), Count = 30 },
                    new TimingModel { Time = new TimeSpan(13, 30, 0), Count = 40 },
                    new TimingModel { Time = new TimeSpan(13, 40, 0), Count = 20 },
                    new TimingModel { Time = new TimeSpan(13, 50, 0), Count = 5 },
                    new TimingModel { Time = new TimeSpan(14, 0, 0), Count = 30 },
                    new TimingModel { Time = new TimeSpan(14, 30, 0), Count = 10 },
                    new TimingModel { Time = new TimeSpan(15, 0, 0), Count = 25 },
                    new TimingModel { Time = new TimeSpan(15, 20, 0), Count = 7 },
                    new TimingModel { Time = new TimeSpan(15, 40, 0), Count = 2 }
                };

            var viewModel =
                data.OrderBy(item => item.Time)
                    .Select(
                        item =>
                            new { hour = item.Time.Value.Hours, minutes = item.Time.Value.Minutes, count = item.Count });
            
            return this.Json(viewModel);
        }
    }
}