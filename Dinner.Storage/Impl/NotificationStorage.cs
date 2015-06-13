using System;
using System.Collections.Generic;

using Dinner.Entities;
using Dinner.Entities.Notification;
using Dinner.Storage.Repository;

namespace Dinner.Storage.Impl
{
    internal class NotificationStorage : INotificationStorage
    {
        private readonly IDataContextFactory dataContextFactory;

        public NotificationStorage(IDataContextFactory dataContextFactory)
        {
            this.dataContextFactory = dataContextFactory;
        }

        public IDictionary<int, UserNotificationContainer> GetUsersForNotification(DateTime fromDate, DateTime toDate)
        {
            IDictionary<int, UserNotificationContainer> result = new Dictionary<int, UserNotificationContainer>();
            using (var dataContext = dataContextFactory.Create())
            {
                var usersForNotification = dataContext.p_GetUsersForNotification(fromDate, toDate);

                foreach (var user in usersForNotification)
                {
                    UserNotificationContainer container;
                    if (!result.ContainsKey(user.ID))
                    {
                        container = new UserNotificationContainer()
                        {
                            SendDailyNotification = user.SendDailyNotification,
                            SendWeeklyNotification = user.SendWeeklyNotification,
                            UserID = user.ID,
                            Name = user.Name,
                            Email = user.Email,
                            Days = new List<DateTime>()
                        };
                        result.Add(user.ID, container);
                    }
                    else
                    {
                        container = result[user.ID];
                    }
                    container.Days.Add(user.Date);
                }
            }
            return result;
        }
    }
}
