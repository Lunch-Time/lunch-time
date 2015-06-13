using System.Linq;
using Dinner.Entities.IdentityCards;
using Dinner.Entities.MenuItem;
using Dinner.Entities.Order;
using Dinner.Storage.Repository;

namespace Dinner.Services.Impl
{
    using System;
    using System.Collections.Generic;

    using Dinner.Entities;
    using Dinner.Infrastructure.Log;
    using Dinner.Services.Security;
    using Dinner.Storage;

    internal sealed class OrderService : IOrderService
    {
        /// <summary>
        /// The principal provider.
        /// </summary>
        private readonly IDinnerPrincipalProvider principalProvider;

        /// <summary>
        /// The user dinner storage.
        /// </summary>
        private readonly IUserDinnerStorage userDinnerStorage;

        /// <summary>
        /// The calendar service.
        /// </summary>
        private readonly ICalendarService calendarService;

        /// <summary>
        /// The event log.
        /// </summary>
        private readonly IEventLog eventLog;

        /// <summary>
        /// Initializes a new instance of the <see cref="OrderService"/> class.
        /// </summary>
        /// <param name="principalProvider">The principal provider.</param>
        /// <param name="userDinnerStorage">The user dinner storage.</param>
        /// <param name="calendarService">The calendar service.</param>
        /// <param name="eventLog">The event log.</param>
        public OrderService(IDinnerPrincipalProvider principalProvider, IUserDinnerStorage userDinnerStorage, ICalendarService calendarService, IEventLog eventLog)
        {
            this.principalProvider = principalProvider;
            this.userDinnerStorage = userDinnerStorage;
            this.calendarService = calendarService;
            this.eventLog = eventLog;
        }

        private DinnerPrincipal Principal
        {
            get { return this.principalProvider.Principal; }
        }

        public TimeSpan GetFreezeTime()
        {
            return new TimeSpan(00, 00, 00);
        }

        public DateTime GetFreezeDate(DateTime date)
        {
            var freezeTime = this.GetFreezeTime();
            var freezeDate = this.calendarService.GetDateWithNewTime(date, freezeTime.Hours, freezeTime.Minutes);

            return freezeDate;
        }

        public ChangeOrderItemBoxindexResult ChangeOrderItemBoxindex(
            int orderItemId,
            DateTime date,
            float quantity,
            short box)
        {
            this.Principal.EnsureAuthenticated();

            return this.userDinnerStorage.ChangeOrderItemBoxindex(
                this.Principal.UserID,
                orderItemId,
                date,
                quantity,
                box);
        }

        public IEnumerable<OrderedMenuModel> GetUserOrderForDay(int companyId, int userId, DateTime date)
        {
            this.Principal.EnsureAuthenticated();
            return this.userDinnerStorage.GetUserOrderForDay(companyId, userId, date);
        }

        public IEnumerable<UserOrdersModel> GetAllOrdersForDay(int companyId, DateTime date)
        {
            this.Principal.EnsureAdmin();
            return this.userDinnerStorage.GetAllOrdersForDay(companyId, date);
        }

        public OrderResult AddOrderItem(DateTime date, int courseId, double quantity)
        {
            this.Principal.EnsureAuthenticated();
            
            var orderResult = this.userDinnerStorage.AddOrderItem(this.Principal.UserID, courseId, date, (float)quantity);
            this.eventLog.Log(
                EventLogType.Information,
                string.Format("Added new order for course #{0} and date {1:d}. Quantity: {2}.", courseId, date, quantity),
                orderResult);

            return orderResult;
        }

        public OrderResult RemoveOrder(int orderId, DateTime date)
        {
            this.Principal.EnsureAuthenticated();

            var orderResult = this.userDinnerStorage.RemoveOrder(orderId);
            this.eventLog.Log(
                EventLogType.Information,
                string.Format("Order #{0} for date {1:d} have been removed.", orderId, date),
                orderResult);

            return null;
        }

        public OrderResult RemoveOrderItem(int orderItemId, DateTime date)
        {
            this.Principal.EnsureAuthenticated();

            var orderResult = this.userDinnerStorage.RemoveOrderItem(this.Principal.UserID, orderItemId, date);
            this.eventLog.Log(
                EventLogType.Information,
                string.Format("Order #{0} for date {1:d} have been removed.", orderItemId, date),
                orderResult);

            return orderResult;
        }

        public bool IsMenuFreezedForDate(DateTime date)
        {
            return this.calendarService.GetCurrentDate() > this.GetFreezeDate(date);
        }

        public IDictionary<DateTime, UserOrdersModel> GetUserOrders(DateTime startDate, DateTime endDate)
        {
            this.Principal.EnsureAuthenticated();
            
            return this.userDinnerStorage
                .GetUserOrderForPeriod(this.Principal.CompanyID, this.Principal.UserID, startDate, endDate);
        }

        public IEnumerable<MenuItemWishModel> GetMenuItemWish(DateTime date)
        {
            this.Principal.EnsureAuthenticated();
            return this.userDinnerStorage.GetMenuItemWish(this.Principal.UserID, date);
        }

        public IEnumerable<MenuItemWishModel> GetDayMenuItemWish(DateTime date)
        {
            this.Principal.EnsureAuthenticated();
            return this.userDinnerStorage.GetDayMenuItemWish(date);
        }

        public void SetMenuItemWish(DateTime date, int menuItemId)
        {
            this.Principal.EnsureAuthenticated();
            this.userDinnerStorage.SetMenuItemWish(this.Principal.UserID, date, menuItemId);
        }

        public void DeleteMenuItemWish(DateTime date, int menuItemId)
        {
            this.Principal.EnsureAuthenticated();
            this.userDinnerStorage.DeleteMenuItemWish(this.Principal.UserID, menuItemId, date);
        }

        public IdentityCardOrdersModel GetOrderByIdentityCard(DateTime date, string hexIdentityCard)
        {
            this.Principal.EnsureAuthenticated();

            // try find day orders
            var userOrders = this.userDinnerStorage.GetOrderByIdentityCard(this.Principal.CompanyID, date, hexIdentityCard);
            if (userOrders != null)
            {
                return new IdentityCardOrdersModel()
                {
                    Status = IdentityCardOrderStatus.Success,
                    CardHolderName = string.Empty,
                    CardHolderEmail = string.Empty,
                    UserOrders = userOrders
                };
            }

            // try find card
            IEnumerable<IdentityCardModel> cardList = this.userDinnerStorage.GetIdentityCard(hexIdentityCard);
            IdentityCardModel card = cardList.FirstOrDefault();
            if (card == null)
            {
                return new IdentityCardOrdersModel()
                {
                    Status = IdentityCardOrderStatus.CardNotFound,
                    CardHolderName = string.Empty,
                    CardHolderEmail = string.Empty,
                    UserOrders = null
                };
            }

            return new IdentityCardOrdersModel()
            {
                Status = card.CustomerUserID.HasValue ? IdentityCardOrderStatus.OrderNotFound : IdentityCardOrderStatus.CardNotMapped,
                CardHolderName = card.CardHolderName,
                CardHolderEmail = card.CardHolderEmail,
                UserOrders = null
            }; 
        }

        public UserOrdersModel GetUserOrderById(int orderId, DateTime date)
        {
            this.Principal.EnsureAuthenticated();
            return this.userDinnerStorage.GetUserOrderById(orderId, date);
        }

        public IEnumerable<IdentityCardModel> GetIdentityCard(string hexIdentityCard)
        {
            this.Principal.EnsureAuthenticated();
            return this.userDinnerStorage.GetIdentityCard(hexIdentityCard);
        }

        public void AssignIdentityCardToUser(int companyId, int userId, string hexIdentityCard)
        {
            this.Principal.EnsureAuthenticated();
            this.userDinnerStorage.AssignIdentityCardToUser(companyId, userId, hexIdentityCard);
        }

        public void SetOrderPurchased(int orderId, TimeSpan time, bool isPurchased)
        {
            this.Principal.EnsureAuthenticated();
            this.userDinnerStorage.SetOrderPurchased(orderId, time, isPurchased);
        }
    }
}
