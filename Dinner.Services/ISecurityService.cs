namespace Dinner.Services
{
    using Dinner.Services.Security;

    public interface ISecurityService
    {
        /// <summary>
        /// Gets the principal.
        /// </summary>
        /// <param name="userId">The user unique identifier.</param>
        /// <returns>The principal.</returns>
        DinnerPrincipal GetPrincipal(int? userId);

        /// <summary>
        /// Authenticates the user and returns principal.
        /// </summary>
        /// <param name="login">The login.</param>
        /// <param name="password">The password.</param>
        /// <returns>The dinner principal.</returns>
        DinnerPrincipal Login(string login, string password);

        /// <summary>
        /// Registers the new user.
        /// </summary>
        /// <param name="userDisplayName">Display name of the user.</param>
        /// <param name="userName">Name of the user.</param>
        /// <param name="password">The password.</param>
        void Register(string userDisplayName, string userName, string password);
    }
}