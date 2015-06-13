using System.Text;
using Dinner.Entities.IdentityCards;

namespace Dinner.Controllers.Api
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;

    using Dinner.Attributes;
    using Dinner.Entities;
    using Dinner.Models;
    using Dinner.Services;
    using Dinner.Services.Security;
    using Dinner.ViewModels.User;

    [ApiExceptionFilter]
    [System.Web.Mvc.Authorize]
    public class MenuController : ApiController
    {
        private readonly IMenuService menuService;

        private readonly IOrderService orderService;

        private readonly IDinnerPrincipalProvider principalProvider;

        private readonly ICalendarService calendarService;

        /// <summary>
        /// Initializes a new instance of the <see cref="MenuController" /> class.
        /// </summary>
        /// <param name="menuService">The menu service.</param>
        /// <param name="orderService">The order service.</param>
        /// <param name="principalProvider">The principal provider.</param>
        /// <param name="calendarService">The calendar service.</param>
        public MenuController(IMenuService menuService, IOrderService orderService,
            IDinnerPrincipalProvider principalProvider, ICalendarService calendarService)
        {
            this.menuService = menuService;
            this.orderService = orderService;
            this.principalProvider = principalProvider;
            this.calendarService = calendarService;
        }

        [ActionName("GetCoursesAndOrders")]
        public OrderModel GetCoursesAndOrders(DateTime date)
        {
            var currentUser = this.principalProvider.Principal;

            var freezeTime = this.orderService.GetFreezeTime();
            var isFreezed = this.orderService.IsMenuFreezedForDate(date);
            var dayMenu = this.menuService.GetDayMenu(date);
            var orderedMenus = this.orderService.GetUserOrderForDay(currentUser.CompanyID, currentUser.UserID, date);
            var wishedMenuItems = this.orderService.GetMenuItemWish(date);

            var menu = new OrderModel
            {
                Date = date,
                IsFreezed = isFreezed,
                FreezeTime = freezeTime,
                AvailableCourses = dayMenu,
                WishedCourses = wishedMenuItems.Select(menuItem => menuItem.CourseID),
                OrderedMenus = orderedMenus
            };

            return menu;
        }

        [ActionName("GetOrders")]
        public IEnumerable<UserOrdersForDateViewModel> GetOrders(DateTime fromDate, DateTime toDate)
        {
            var orders = this.orderService.GetUserOrders(fromDate, toDate);

            var userOrdersInRangeViewModel = new List<UserOrdersForDateViewModel>();

            for (var orderDate = fromDate; orderDate <= toDate; orderDate = orderDate.AddDays(1))
            {
                if (!this.calendarService.IsWorkingDay(orderDate))
                    continue;  

                UserOrdersModel userOrders;             
                if (!orders.ContainsKey(orderDate.Date))
                {
                    userOrders = new UserOrdersModel
                        {
                            OrderID = 0,
                            IsPurchased = false,
                            Orders = new List<OrderedMenuModel>()
                        };
                }
                else
                {
                    userOrders = orders[orderDate.Date];
                }

                var isFreezed = this.orderService.IsMenuFreezedForDate(orderDate);
                var userOrdersForDateViewModel = new UserOrdersForDateViewModel
                    {
                        OrderID = userOrders.OrderID,
                        Date = orderDate,
                        IsFreezed = isFreezed,
                        IsPurchased = userOrders.IsPurchased,
                        Orders = userOrders.Orders
                    };

                userOrdersInRangeViewModel.Add(userOrdersForDateViewModel);
            }

            return userOrdersInRangeViewModel;
        }

        [ActionName("OrderCourse")]
        public int OrderCourse(OrderCourseModel model)
        {
            this.EnsureFreezeTime(model.Date);

            var result = this.orderService.AddOrderItem(model.Date, model.CourseId, model.Quantity);
            if (result == null)
                throw new InvalidOperationException("Превышен лимит порций!");

            return result.ID;
        }

        [ActionName("RemoveOrder")]
        public void RemoveOrder(RemoveOrderModel model)
        {
            this.EnsureFreezeTime(model.Date);

            this.orderService.RemoveOrderItem(model.OrderId, model.Date);
        }

        [ActionName("RemoveOrder2")]
        public void RemoveOrder2(RemoveOrderModel model)
        {
            this.EnsureFreezeTime(model.Date);

            this.orderService.RemoveOrder(model.OrderId, model.Date);
        }

        [ActionName("MoveOrderToBox")]
        public int MoveOrderToBox(MoveToBoxModel model)
        {
            this.EnsureFreezeTime(model.Date);

            var result = this.orderService.ChangeOrderItemBoxindex(model.OrderId, model.Date, model.Quantity, model.Box);

            return result.NewID;
        }

        [ActionName("OrderByIdentityCard")]
        [HttpGet]
        public IdentityCardOrdersModel OrderByIdentityCard(string identityCard)
        {
            DateTime date = DateTime.Now;
            string hexIdentityCard = ConverterDexToHex(identityCard);

            return this.orderService.GetOrderByIdentityCard(date, hexIdentityCard);
        }

        [ActionName("OrderByID")]
        [HttpGet]
        public UserOrdersModel OrderByID(int orderId)
        {
            DateTime date = DateTime.Now;
            return this.orderService.GetUserOrderById(orderId, date);
        }

        [ActionName("SetOrderPurchased")]
        [HttpGet]
        [Admin]
        public void SetOrderPurchased([FromUri] OrderPurchasedQuery query)
        {
            DateTime date = DateTime.Now;
            this.orderService.SetOrderPurchased(query.OrderId, date.TimeOfDay, query.IsPurchased);
        }

        [HttpPost]
        [ActionName("WishCourse")]
        public void WishCourse(WishCourseViewModel viewModel)
        {
            this.orderService.SetMenuItemWish(viewModel.Date, viewModel.MenuItemId);
        }

        [HttpPost]
        [ActionName("UnwishCourse")]
        public void UnwishCourse(WishCourseViewModel viewModel)
        {
            this.orderService.DeleteMenuItemWish(viewModel.Date, viewModel.MenuItemId);
        }

        private void EnsureFreezeTime(DateTime date)
        {
            var isFreezed = this.orderService.IsMenuFreezedForDate(date);
            if (isFreezed)
                throw new InvalidOperationException(
                    string.Format("Ваш заказ на {0} заморожен.", date.ToShortDateString()));
        }

        private string ConverterDexToHex(string identityCard)
        {
            long parseValue;
            if (!long.TryParse(identityCard, out parseValue))
            {
                throw new ArgumentOutOfRangeException("identityCard", "Identity card is not valid");
            }
            var hexValue = new StringBuilder(parseValue.ToString("X2"));
            for (int i = hexValue.Length; i < 10; i++)
            {
                hexValue.Insert(0, "0");
            }
            return hexValue.ToString();
        }

        public class OrderPurchasedQuery
        {
            public int OrderId { get; set; }
            public bool IsPurchased { get; set; }
        }
    }
}