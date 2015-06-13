using System;
using System.Globalization;
using System.Web.Mvc;

namespace Dinner.Controllers
{
    using Dinner.Services;

    public abstract class BaseController : Controller
    {
        protected BaseController(ICalendarService calendarService)
        {
            this.CalendarService = calendarService;
        }

        protected ICalendarService CalendarService { get; private set; }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            DateTime currentDate = this.CalendarService.GetCurrentDate();
            filterContext.Controller.ViewBag.CurrentDate = currentDate;
            filterContext.Controller.ViewBag.NextWorkingDate = this.CalendarService.IsWorkingDay(currentDate)
                                                                   ? currentDate
                                                                   : this.CalendarService.GetNextWorkingDay(currentDate);
            base.OnActionExecuting(filterContext);
        }

        protected DateTime GetMenuDate(string dateString)
        {
            DateTime date;
            var isParsed = DateTime.TryParse(
                dateString,
                CultureInfo.CurrentCulture,
                DateTimeStyles.AssumeLocal,
                out date);

            var menuDate = isParsed ? date : this.CalendarService.GetCurrentDate().AddDays(1);

            return this.CalendarService.IsWorkingDay(menuDate)
                       ? menuDate
                       : this.CalendarService.GetNextWorkingDay(menuDate);
        }
    }
}
