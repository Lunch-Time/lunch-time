using System;
using System.Web.Mvc;

using Dinner.Entities;
using Dinner.Models;

namespace Dinner.Controllers
{
    using System.Collections.Generic;

    using Dinner.Services;

    [Authorize]
    public class MenuController : BaseController
    {
        private const int CompanyID = 1;

        private readonly IMenuService menuService;

        private readonly IOrderService orderService;

        private readonly ICompanyService companyService;

        public MenuController(
            IMenuService menuService, 
            IOrderService orderService, 
            ICalendarService calendarService,
            ICompanyService companyService) : base(calendarService)
        {
            this.menuService = menuService;
            this.orderService = orderService;
            this.companyService = companyService;
        }

        [AllowAnonymous]
        public ActionResult Index(string date)
        {
            if (User.Identity.IsAuthenticated)
            {
                return this.OrderMenu(date);
            }

            return ViewMenu(date);
        }

        [AllowAnonymous]
        public ActionResult ViewMenu(string date)
        {
            var menuDate = this.GetMenuDate(date);

            var menuCourses = this.menuService.GetDayMenu(menuDate);
            var companySettings = this.companyService.GetSettings(CompanyID);

            var viewModel = new MenuModel
                {
                    Date = menuDate,
                    MenuCourses = menuCourses,
                    CompanySettings = companySettings
                };
            return View("ViewMenu", viewModel);
        }

        public ActionResult OrderMenu(string date)
        {
            var menuDate = this.GetMenuDate(date);
            if (string.IsNullOrEmpty(date))
                return this.RedirectToAction("Index", new { date = menuDate.ToString("yyyy-MM-dd") });

            var isFreezed = this.orderService.IsMenuFreezedForDate(menuDate);
            var model = new OrderModel
            {
                Date = menuDate,
                IsFreezed = isFreezed
            };

            return View("OrderMenu", model);
        }

        public ActionResult UserOrders()
        {
            var startDate = this.CalendarService.GetCurrentDate().Date;
            var endDate = startDate.AddDays(8);

            var orders = this.orderService.GetUserOrders(startDate, startDate.AddMonths(1));
            var frozedDates = new HashSet<DateTime>();

            for (var orderDate = startDate; orderDate < endDate; orderDate = orderDate.AddDays(1))
            {
                if (!orders.ContainsKey(orderDate.Date) && this.CalendarService.IsWorkingDay(orderDate))
                {
                    orders[orderDate.Date] = new UserOrdersModel {Orders = new List<OrderedMenuModel>()};
                }

                if (this.orderService.IsMenuFreezedForDate(orderDate))
                {
                    frozedDates.Add(orderDate.Date);
                }
            }

            ViewBag.NextWorkingDate = startDate;
            ViewBag.FrozenDates = frozedDates;
            ViewBag.DeleteFrozenDate = GetDeleteFrozenDate();

            return this.View("UserOrders", orders);
        }

        public ActionResult ngUserOrders()
        {
            return this.View();
        }

        private DateTime GetDeleteFrozenDate()
        {
            DateTime now = this.CalendarService.GetCurrentDate();
            return this.CalendarService.GetDateWithNewTime(now, 11, 30);
        }
    }
}