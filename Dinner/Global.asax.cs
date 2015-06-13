using System;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

using Autofac;
using Autofac.Integration.WebApi;

namespace Dinner
{
    using Autofac.Integration.Mvc;

    using Dinner.Helpers;
    using Dinner.Infrastructure.Log;
    using Dinner.Services.Security;

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            ModelBinders.Binders.Add(typeof(double), new DoubleModelBinder());

            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            WebApiConfig.RegisterFormatters(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

            this.InitContainer();

            if (ApplicationEnvironment.IsRelease)
            {
                RequireJsConfig.Register();
            }
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            Context.User = DependencyResolver.Current.GetService<IDinnerPrincipalProvider>().Principal;
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();

            if (exception is UnauthorizedAccessException)
            {
                Response.RedirectToRoute("Account", new { action = "LogOff" });
                Response.End();
            }
            else
            {
                var eventLog = DependencyResolver.Current.GetService<IEventLog>();
                eventLog.LogError(exception);
                Response.Clear();
            }
        }

        private void InitContainer()
        {
            var builder = new ContainerBuilder();
            builder.RegisterModule<WebModule>();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            var resolver = new AutofacWebApiDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver = resolver;
        }
    }
}