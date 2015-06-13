namespace Dinner.Services.Security
{
    /// <summary>
    /// Providers the current principal.
    /// </summary>
    public interface IDinnerPrincipalProvider
    {
        DinnerPrincipal Principal { get; }
    }
}