namespace Dinner
{
    using System;
    using System.Web;
    using System.Web.Security;

    using Dinner.Infrastructure;
    using Dinner.Infrastructure.Cache;
    using Dinner.Services;
    using Dinner.Services.Security;

    internal sealed class WebPrincipalProvider : DinnerPrincipalProviderBase
    {
        /// <summary>
        /// The security service.
        /// </summary>
        private readonly ISecurityService securityService;

        /// <summary>
        /// The cache manager.
        /// </summary>
        private readonly ICacheManager cacheManager;

        /// <summary>
        /// Initializes a new instance of the <see cref="WebPrincipalProvider"/> class.
        /// </summary>
        /// <param name="securityService">The security service.</param>
        /// <param name="cacheManager">The cache manager.</param>
        public WebPrincipalProvider(ISecurityService securityService, ICacheManager cacheManager)
        {
            this.securityService = securityService;
            this.cacheManager = cacheManager;
        }

        /// <inheritdoc />
        public override DinnerPrincipal Principal
        {
            get
            {
                if (HttpContext.Current.Items["User"] == null)
                {
                    HttpContext.Current.Items["User"] = this.LoadPrincipal();
                }

                return (DinnerPrincipal)HttpContext.Current.Items["User"];
            }
        }

        /// <summary>
        /// Loads the principal.
        /// </summary>
        private DinnerPrincipal LoadPrincipal()
        {
            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            
            if (authCookie != null && authCookie.Value != string.Empty)
            {
                string cacheKey = string.Format("Principal" + authCookie.Value);

                return this.cacheManager.GetOrAdd(
                    cacheKey,
                    () => this.LoadPrincipalByAuthCookie(authCookie),
                    DateTimeOffset.Now.AddMinutes(10));
            }

            return this.securityService.GetPrincipal(null);
        }

        /// <summary>
        /// Loads the principal by authentication cookie.
        /// </summary>
        /// <param name="authCookie">The authentication cookie.</param>
        /// <returns>The principal.</returns>
        private DinnerPrincipal LoadPrincipalByAuthCookie(HttpCookie authCookie)
        {
            var authTicket = FormsAuthentication.Decrypt(authCookie.Value);
            int? userId = authTicket.UserData.ToIntOrNull();

            return this.securityService.GetPrincipal(userId);
        }
    }
}