namespace Dinner.Mail.Models
{
    public class WeeklyNotificationTemplateModel : BaseTemplateModel
    {
        public WeeklyNotificationTemplateModel(string to, string userName, string unsubscribePath)
        {
            To = to;
            UserName = userName;
            UnsubscribePath = unsubscribePath;
        }

        public string UnsubscribePath { get; protected set; }

        public string UserName { get; protected set; }

        public override EmailTemplateType TemplateName
        {
            get { return EmailTemplateType.WeeklyNotification; }
        }
    }
}