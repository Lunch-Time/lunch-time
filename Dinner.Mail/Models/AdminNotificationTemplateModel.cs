namespace Dinner.Mail.Models
{
    public class AdminNotificationTemplateModel : BaseTemplateModel
    {
        public AdminNotificationTemplateModel(string to, string text, string unsubscribePath)
        {
            To = to;
            Text = text;
            UnsubscribePath = unsubscribePath;
        }

        public string Text { get; protected set; }

        public string UnsubscribePath { get; protected set; }

        public override EmailTemplateType TemplateName
        {
            get { return EmailTemplateType.AdminNotification; }
        }
    }
}