using System;
using System.Linq;
using System.Web.Http;

namespace Dinner.Controllers.Api
{
    using Dinner.Attributes;
    using Dinner.Models;
    using Dinner.Services;
    using Dinner.Services.Security;

    [ApiExceptionFilter]
    [System.Web.Mvc.Authorize]
    [Admin]
    public class OrdersController : ApiController
    {
        private readonly IMenuService menuService;

        private readonly IOrderService orderService;

        private readonly IDinnerPrincipalProvider principalProvider;

        /// <summary>
        /// Initializes a new instance of the <see cref="OrdersController" /> class.
        /// </summary>
        /// <param name="menuService">The menu service.</param>
        /// <param name="orderService">The order service.</param>
        /// <param name="principalProvider">The principal provider.</param>
        public OrdersController(IMenuService menuService, IOrderService orderService,
            IDinnerPrincipalProvider principalProvider)
        {
            this.menuService = menuService;
            this.orderService = orderService;
            this.principalProvider = principalProvider;
        }

        [ActionName("GetUsersOrders")]
        [HttpGet]
        public SalesViewModel GetUsersOrders(DateTime date)
        {
            var usersOrders =
                this.orderService.GetAllOrdersForDay(this.principalProvider.Principal.CompanyID, date).ToList();

            var viewModel = new SalesViewModel { Date = date, UsersOrders = usersOrders };

            return viewModel;
        }

        /// <summary>
        /// Purchases the order.
        /// </summary>
        /// <param name="model">The model.</param>
        [ActionName("PurchaseOrder")]
        [HttpPost]
        public void PurchaseOrder(PurchaseOrderViewModel model)
        {
            this.orderService.SetOrderPurchased(model.OrderId, model.PurchaseTime.TimeOfDay, true);
        }

        /// <summary>
        /// Undo purchases the order.
        /// </summary>
        /// <param name="model">The model.</param>
        [ActionName("UndoPurchaseOrder")]
        [HttpPost]        
        public void UndoPurchaseOrder(PurchaseOrderViewModel model)
        {
            this.orderService.SetOrderPurchased(model.OrderId, model.PurchaseTime.TimeOfDay, false);
        }

        /// <summary>
        /// Removes the order.
        /// </summary>
        /// <param name="model">The model.</param>
        [ActionName("RemoveOrder")]
        [HttpPost]   
        public void RemoveOrder(RemoveOrderModel model)
        {
            this.orderService.RemoveOrder(model.OrderId, model.Date);
        }
        

        [ActionName("AssignIdentityCardToUser")]
        [HttpPost]
        public void AssignIdentityCardToUser(AssignIdentityCardToUserViewModel model)
        {
            this.orderService.AssignIdentityCardToUser(
                this.principalProvider.Principal.CompanyID,
                model.UserId,
                model.IdentityCard);
        }
    }
}
