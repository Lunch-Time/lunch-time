using System;
using System.Collections.Generic;

namespace Dinner.Entities.Notification
{
    public class UserNotificationContainer
    {
        public UserNotificationContainer()
        {
            Days = new List<DateTime>();
        }

        public bool SendDailyNotification { get; set; }
        public bool SendWeeklyNotification { get; set; }
        public DateTime Date { get; set; }
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public IList<DateTime> Days { get; set; } 
    }
}
