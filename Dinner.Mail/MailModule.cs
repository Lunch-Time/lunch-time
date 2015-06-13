using Autofac;

using Dinner.Mail.Impl;
using Dinner.Mail.Interfaces;

namespace Dinner.Mail
{
    public class MailModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);
            // builder.RegisterType<IEmailTemplate>().AsImplementedInterfaces().SingleInstance();
            // builder.RegisterType<ISmtpClient>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<FileSystemEmailTemplateContentReader>().As<IEmailTemplateContentReader>().SingleInstance();
            builder.RegisterType<EmailSender>().As<IEmailSender>().SingleInstance();
            builder.RegisterType<EmailTemplateEngine>().As<IEmailTemplateEngine>().SingleInstance().PreserveExistingDefaults();
            builder.RegisterType<EmailSystem>().As<IEmailSystem>().SingleInstance();
        }
    }
}
