using System;
using System.Collections.Generic;

using Dinner.Entities;
using Dinner.Entities.Course;
using Dinner.Entities.IdentityCards;
using Dinner.Entities.MenuItem;
using Dinner.Entities.Order;

namespace Dinner.Storage
{
    public interface IUserDinnerStorage
    {
        IEnumerable<CourseModel> GetDayMenu(int companyID, DateTime date);

        IEnumerable<TimingModel> GetDayTiming(int companyID, DateTime date);

        OrderResult AddOrderItem(int userId, int courseId, DateTime date, float quantity);

        OrderResult RemoveOrder(int orderId);

        OrderResult RemoveOrderItem(int userId, int orderItemId, DateTime date);

        ChangeOrderItemBoxindexResult ChangeOrderItemBoxindex(int userId, int orderItemId, DateTime date, float quantity, short boxindex);

        void SetDinnerTime(int userId, DateTime date, TimeSpan? time);

        TimeSpan? GetDinnerTime(int userId, DateTime date);

        UserOrdersModel GetUserOrderById(int orderId, DateTime day);

        IEnumerable<CourseModel> GetAllCourses(int companyId, bool includeDeleted);

        IEnumerable<OrderedMenuModel> GetUserOrderForDay(int companyId, int userId, DateTime day);

        IDictionary<DateTime, UserOrdersModel> GetUserOrderForPeriod(int companyId, int userId, DateTime startDate, DateTime endDate);

        IEnumerable<UserOrdersModel> GetAllOrdersForDay(int companyId, DateTime day);
        // UserOrdersModel GetUserOrdersForDay(int customerUserId, DateTime day);

        UserSettingsModel GetUserSettings(int userId);

        void SetUserSettings(UserSettingsModel model, int userId);

        // MenuItem wish
        IEnumerable<MenuItemWishModel> GetMenuItemWish(int customerUserId, DateTime date);
        IEnumerable<MenuItemWishModel> GetDayMenuItemWish(DateTime date);
        void SetMenuItemWish(int customerUserId, DateTime date, int menuItemId);
        void DeleteMenuItemWish(int customerUserId, int menuItemId, DateTime date);

        // IdentityCard
        UserOrdersModel GetOrderByIdentityCard(int supplierCompanyId, DateTime date, string hexIdentityCard);
        IEnumerable<IdentityCardModel> GetIdentityCard(string hexIdentityCard);
        void AssignIdentityCardToUser(int companyId, int userId, string hexIdentityCard);
        void SetOrderPurchased(int orderId, TimeSpan time, bool isPurchased);
    }
}
