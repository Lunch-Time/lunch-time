using System.Web.Mvc;

using Dinner.Attributes;
using Dinner.Models;

namespace Dinner.Controllers
{
    using Dinner.Services;

    [Authorize]
    [Admin]
    public class AdminController : BaseController
    {
        public AdminController(ICalendarService calendarService) : base(calendarService)
        {

        }

        public ActionResult Index(string date)
        {
            var menuDate = this.GetMenuDate(date);
            if (string.IsNullOrEmpty(date))
                return this.RedirectToAction("Index", new { date = menuDate.ToString("yyyy-MM-dd") });

            var viewModel = new MenuFormationModel
            {
                Date = menuDate
            };

            return this.View(viewModel);
        }
    }
}