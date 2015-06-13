using System;

using Dinner.Mail.Interfaces;
using Dinner.Mail.Models;
using Dinner.Mail.Utils;

namespace Dinner.Mail.Impl
{
    public class EmailSystem : IEmailSystem
    {
        public EmailSystem(IEmailTemplateEngine templateEngine, IEmailSender sender)
        {
            // Invariant.IsNotBlank(fromAddress, "fromAddress");
            Invariant.IsNotNull(templateEngine, "templateEngine");
            Invariant.IsNotNull(sender, "sender");

            // FromAddress = fromAddress;
            TemplateEngine = templateEngine;
            Sender = sender;
        }

        protected IEmailTemplateEngine TemplateEngine { get; private set; }

        protected IEmailSender Sender { get; private set; }

        protected string FromAddress { get; private set; }

        public void SendMail(BaseTemplateModel model)
        {
            Email mail = TemplateEngine.Execute(Enum.GetName(typeof(EmailTemplateType), model.TemplateName), model);
            Sender.Send(mail);
        }
    }
}