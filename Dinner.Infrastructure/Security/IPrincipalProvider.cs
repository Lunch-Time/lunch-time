namespace Dinner.Infrastructure.Security
{
    using System.Security.Principal;

    /// <summary>
    /// Provides the current principal.
    /// </summary>
    public interface IPrincipalProvider
    {
        IPrincipal Principal { get; }
    }
}
