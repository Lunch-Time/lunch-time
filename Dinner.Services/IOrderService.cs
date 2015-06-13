using Dinner.Entities.IdentityCards;
using Dinner.Entities.MenuItem;
using Dinner.Entities.Order;

namespace Dinner.Services
{
    using System;
    using System.Collections.Generic;

    using Dinner.Entities;

    public interface IOrderService
    {
        TimeSpan GetFreezeTime();

        UserOrdersModel GetUserOrderById(int orderId, DateTime date);
        IEnumerable<OrderedMenuModel> GetUserOrderForDay(int companyId, int userId, DateTime date);
        IEnumerable<UserOrdersModel> GetAllOrdersForDay(int companyId, DateTime date);

        OrderResult AddOrderItem(DateTime date, int courseId, double quantity);

        OrderResult RemoveOrder(int orderId, DateTime date);
        OrderResult RemoveOrderItem(int orderItemId, DateTime date);

        bool IsMenuFreezedForDate(DateTime date);

        IDictionary<DateTime, UserOrdersModel> GetUserOrders(DateTime startDate, DateTime endDate);

        ChangeOrderItemBoxindexResult ChangeOrderItemBoxindex(int orderItemId, DateTime date, float quantity, short box);

        DateTime GetFreezeDate(DateTime date);


        // MenuItem wish
        IEnumerable<MenuItemWishModel> GetMenuItemWish(DateTime date);
        IEnumerable<MenuItemWishModel> GetDayMenuItemWish(DateTime date);
        void SetMenuItemWish(DateTime date, int menuItemId);
        void DeleteMenuItemWish(DateTime date, int menuItemId);

        // IdentityCard
        IdentityCardOrdersModel GetOrderByIdentityCard(DateTime date, string hexIdentityCard);
        IEnumerable<IdentityCardModel> GetIdentityCard(string hexIdentityCard);
        void AssignIdentityCardToUser(int companyId, int userId, string hexIdentityCard);
        void SetOrderPurchased(int orderId, TimeSpan time, bool isPurchased);
    }
}