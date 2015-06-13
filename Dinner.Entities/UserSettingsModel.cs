using System;

namespace Dinner.Entities
{
    public class UserSettingsModel
    {
        public int UserID { get; set; }
        public TimeSpan? Time { get; set; }
        public bool SendAdminNotification { get; set; }
        public bool SendChangedOrderNotification { get; set; }
        public bool SendWeeklyNotification { get; set; }
        public bool SendDailyNotification { get; set; }
    }
}
