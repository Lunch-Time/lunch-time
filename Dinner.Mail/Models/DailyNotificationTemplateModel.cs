namespace Dinner.Mail.Models
{
    public class DailyNotificationTemplateModel : BaseTemplateModel
    {
        public DailyNotificationTemplateModel(string to, string userName, string dayName, string unsubscribePath)
        {
            To = to;
            UserName = userName;
            DayName = dayName;
            UnsubscribePath = unsubscribePath;
        }

        public string UserName { get; protected set; }

        public string UnsubscribePath { get; protected set; }

        public string DayName { get; protected set; }

        public override EmailTemplateType TemplateName
        {
            get { return EmailTemplateType.DailyNotification; }
        }
    }
}