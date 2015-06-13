using System;
using System.Collections.Generic;
using System.Web.Mvc;

using Dinner.Attributes;
using Dinner.Entities;
using Dinner.Models;
using Dinner.Models.Orders;

namespace Dinner.Controllers
{
    using System.Linq;

    using Dinner.Services;
    using Dinner.Services.Security;

    [Authorize]
    [Admin]
    public class OrdersController : BaseController
    {
        private readonly IOrderService orderService;

        private readonly IDinnerPrincipalProvider principalProvider;

        public OrdersController(IOrderService orderService, IDinnerPrincipalProvider principalProvider, ICalendarService calendarService) : base(calendarService)
        {
            this.orderService = orderService;
            this.principalProvider = principalProvider;
        }

        public ActionResult Index(string date)
        {
            var viewModel = this.GetOrdersForDate(date);

            return View(viewModel);
        }

        public ActionResult Sales()
        {
            return this.View();
        }


        public ActionResult Print(string date)
        {
            OrdersModel viewModel = this.GetOrdersForDate(date);

            return View(viewModel);
        }

        [HttpPost]
        public ActionResult RemoveOrder(int orderId, DateTime date)
        {
            this.orderService.RemoveOrder(orderId, date);

            return this.RedirectToAction("Index", new { date = date.ToString("yyyy-MM-dd") });
        }

        private OrdersModel GetOrdersForDate(string date)
        {
            var menuDate = this.GetMenuDate(date);

            var usersOrders = this.orderService.GetAllOrdersForDay(this.principalProvider.Principal.CompanyID, menuDate).ToList();
            var orders = this.GetOrders(usersOrders);

            var viewModel = new OrdersModel
                {
                    Date = menuDate,
                    UsersOrders = usersOrders,
                    Orders = orders
                };

            return viewModel;
        }

        private IEnumerable<OrderedMenuModel> GetOrders(IEnumerable<UserOrdersModel> usersOrders)
        {
            var orders = new Dictionary<int, OrderedMenuModel>();

            foreach (var userOrders in usersOrders)
            {
                foreach (var order in userOrders.Orders)
                {
                    if (!orders.ContainsKey(order.Course.ID))
                    {
                        orders[order.Course.ID] = new OrderedMenuModel { Course = order.Course, Quantity = 0, IsPurchased = order.IsPurchased};
                    }

                    orders[order.Course.ID].Quantity += order.Quantity;
                }
            }

            return orders.Values;
        }

        private IList<ReportOrderedItemModel> GetOrdersWithPurchased(IEnumerable<UserOrdersModel> usersOrders)
        {
            var orders = new Dictionary<int, ReportOrderedItemModel>();
            foreach (var userOrders in usersOrders)
            {
                foreach (var order in userOrders.Orders)
                {
                        if (!orders.ContainsKey(order.Course.ID))
                        {
                            orders[order.Course.ID] = new ReportOrderedItemModel
                            {
                                Course = order.Course
                            };
                        }

                    if (order.IsPurchased)
                    {
                        orders[order.Course.ID].PurchasedQuantity += order.Quantity;
                    }
                    else
                    {
                        orders[order.Course.ID].ResidueQuantity += order.Quantity;
                    }
                }
            }

            return orders.Values.ToList();
        }
    }
}
