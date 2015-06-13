    using Autofac;

    using Dinner.Storage.Impl;
using Dinner.Storage.Repository;

namespace Dinner.Storage
{
    public class StorageModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);
            builder.RegisterType<AdminDinnerStorage>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<UserDinnerStorage>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<AuthStorage>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<StatisticStorage>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<NotificationStorage>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<StatisticStorage>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<ImageStorage>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<CompanyStorage>().AsImplementedInterfaces().SingleInstance();

            builder.RegisterType<DataContextFactory>().AsImplementedInterfaces().SingleInstance();
        }
    }
}