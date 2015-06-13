namespace Dinner
{
    using Autofac;
    using Autofac.Integration.Mvc;

    using Dinner.Services;

    public class WebModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);
            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            builder.RegisterFilterProvider();
            builder.RegisterModule<ServiceModule>();

            builder.RegisterType<WebPrincipalProvider>().AsImplementedInterfaces();
        }
    }
}