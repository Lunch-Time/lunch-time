using System.Collections.Generic;

using Dinner.Entities.Notification;

namespace Dinner.Services
{
    public interface INotificationService
    {
        IEnumerable<UserNotificationContainer> SendWeeklyOrDailyNotification();
    }
}
