using Autofac;

using Dinner.Infrastructure;
using Dinner.Mail;
using Dinner.Services.Impl;
using Dinner.Storage;

namespace Dinner.Services
{
    public class ServiceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);
            
            builder.RegisterModule<InfrastructureModule>();
            builder.RegisterModule<MailModule>();
            builder.RegisterModule<StorageModule>();

            builder.RegisterType<CompanyService>().As<ICompanyService>().InstancePerLifetimeScope();
            builder.RegisterType<CourseService>().As<ICourseService>().InstancePerLifetimeScope();
            builder.RegisterType<MenuService>().As<IMenuService>().InstancePerLifetimeScope();
            builder.RegisterType<OrderService>().As<IOrderService>().InstancePerLifetimeScope();
            builder.RegisterType<AccountService>().As<IAccountService>().InstancePerLifetimeScope();
            builder.RegisterType<StatisticsService>().As<IStatisticsService>().InstancePerLifetimeScope();

            builder.RegisterType<SecurityService>().As<ISecurityService>().SingleInstance();
            builder.RegisterType<CalendarService>().As<ICalendarService>().SingleInstance();
            builder.RegisterType<NotificationService>().As<INotificationService>().SingleInstance();
            builder.RegisterType<ImageService>().As<IImageService>().SingleInstance();
        }
    }
}