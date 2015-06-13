using System;

namespace Dinner.Entities.Notification
{
    public class UserNotificationModel
    {
        public DateTime Date { get; set; }
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
