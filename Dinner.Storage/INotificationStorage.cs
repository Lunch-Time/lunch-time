using System;
using System.Collections.Generic;

using Dinner.Entities;
using Dinner.Entities.Notification;

namespace Dinner.Storage
{
    public interface INotificationStorage
    {
        IDictionary<int, UserNotificationContainer> GetUsersForNotification(DateTime fromDate, DateTime toDate);
    }
}
