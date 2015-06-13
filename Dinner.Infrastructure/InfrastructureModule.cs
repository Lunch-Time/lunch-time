using Autofac;

namespace Dinner.Infrastructure
{
    using Dinner.Infrastructure.Cache;
    using Dinner.Infrastructure.Log;
    using Dinner.Infrastructure.Security;
    using Dinner.Infrastructure.Settings;

    public class InfrastructureModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);
            
            builder.RegisterType<RandomStringGenerator>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<ScriptsCompilationService>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<PasswordHashProvider>().As<IPasswordHashProvider>().SingleInstance();
            builder.RegisterType<EventLog>().As<IEventLog>().SingleInstance();
            builder.RegisterType<AppSettings>().Named<ISettings>("settings").SingleInstance();
            builder.RegisterType<CacheManager>().As<ICacheManager>().SingleInstance();

            builder.RegisterDecorator<ISettings>(
                (c, inner) => new CachedSettings(inner, c.Resolve<ICacheManager>()), fromKey: "settings");
        }
    }
}