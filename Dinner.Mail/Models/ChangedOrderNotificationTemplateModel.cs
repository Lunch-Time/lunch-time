namespace Dinner.Mail.Models
{
    public class ChangedOrderNotificationTemplateModel : BaseTemplateModel
    {
        public ChangedOrderNotificationTemplateModel(
            string to, 
            string day, 
            string courseOld, 
            string courseNew, 
            string keyLink)
        {
            To = to;
            Day = day;
            CourseOld = courseOld;
            CourseNew = courseNew;
            KeyLink = keyLink;
        }

        public string Day { get; protected set; }
        public string CourseOld { get; protected set; }
        public string CourseNew { get; protected set; }
        public string KeyLink { get; protected set; }

        public override EmailTemplateType TemplateName
        {
            get { return EmailTemplateType.ChangedOrderNotification; }
        }
    }
}