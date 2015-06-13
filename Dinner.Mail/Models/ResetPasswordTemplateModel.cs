namespace Dinner.Mail.Models
{
    public class ResetPasswordTemplateModel : BaseTemplateModel
    {
        public ResetPasswordTemplateModel(string to, string newPassword)
        {
            To = to;
            NewPassword = newPassword;
        }

        public string NewPassword { get; protected set; }

        public override EmailTemplateType TemplateName
        {
            get { return EmailTemplateType.ResetPasswordNotification; }
        }
    }
}