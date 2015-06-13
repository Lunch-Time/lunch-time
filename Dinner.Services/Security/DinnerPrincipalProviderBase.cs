namespace Dinner.Services.Security
{
    using System.Security.Principal;

    using Dinner.Infrastructure.Security;

    public abstract class DinnerPrincipalProviderBase : IPrincipalProvider, IDinnerPrincipalProvider
    {
        /// <inheritdoc />
        IPrincipal IPrincipalProvider.Principal
        {
            get { return this.Principal; }
        }

        /// <inheritdoc />
        public abstract DinnerPrincipal Principal { get; }
    }
}