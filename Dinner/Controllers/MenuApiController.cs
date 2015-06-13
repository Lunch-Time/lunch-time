namespace Dinner.Controllers
{
    using System;
    using System.Web.Mvc;

    using Dinner.Entities;
    using Dinner.Services;
    using Dinner.Services.Security;

    [Authorize]
    public class MenuApiController : BaseController
    {
        private const int CompanyID = 1;

        private readonly IMenuService menuService;

        private readonly IOrderService orderService;

        /// <summary>
        /// The principal provider.
        /// </summary>
        private readonly IDinnerPrincipalProvider principalProvider;

        public MenuApiController(IMenuService menuService, IOrderService orderService, ICalendarService calendarService, IDinnerPrincipalProvider principalProvider)
            : base(calendarService)
        {
            this.menuService = menuService;
            this.orderService = orderService;
            this.principalProvider = principalProvider;
        }

        [HttpGet]
        public JsonResult GetMenuForDate(DateTime date)
        {
            var isFreezed = this.orderService.IsMenuFreezedForDate(date);
            var dayMenu = this.menuService.GetDayMenu(date);
            var orderedMenus = this.orderService.GetUserOrderForDay(CompanyID, this.principalProvider.Principal.UserID, date);
            
            var model = new OrderModel
            {
                Date = date,
                IsFreezed = isFreezed,
                FreezeTime = this.orderService.GetFreezeTime(),
                AvailableCourses = dayMenu,
                OrderedMenus = orderedMenus
            };

            return this.Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult OrderCourse(int courseId, float quantity, DateTime date)
        {
            this.EnsureFreezeTime(date);

            var result = this.orderService.AddOrderItem(date, courseId, quantity);
            if (result == null)
                throw new InvalidOperationException("Превышен лимит порций!");

            return this.Json(result.ID);
        }

        [HttpPost]
        public JsonResult RemoveOrder(int orderId, DateTime date)
        {
            this.EnsureFreezeTime(date);

            this.orderService.RemoveOrderItem(orderId, date);
            return this.Json(null);
        }

        [HttpPost]
        public JsonResult MoveOrderToBox(int orderId, short box, float quantity, DateTime date)
        {
            this.EnsureFreezeTime(date);

            var result = this.orderService.ChangeOrderItemBoxindex(orderId, date, quantity, box);

            return this.Json(result.NewID);
        }
        
        private void EnsureFreezeTime(DateTime date)
        {
            var isFreezed = this.orderService.IsMenuFreezedForDate(date);
            if (isFreezed)
                throw new InvalidOperationException(
                    string.Format("Ваш заказ на {0} заморожен.", date.ToShortDateString()));
        }
    }
}