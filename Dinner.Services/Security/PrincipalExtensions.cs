namespace Dinner.Services.Security
{
    using System;
    using System.Security.Principal;

    public static class PrincipalExtensions
    {
        /// <summary>
        /// Throws an exception whether current user is not authenticated.
        /// </summary>
        /// <param name="principal">The principal.</param>
        /// <exception cref="System.UnauthorizedAccessException">Current user is not authenticated.</exception>
        public static void EnsureAuthenticated(this IPrincipal principal)
        {
            if (!principal.IsInRole("User"))
            {
                throw new UnauthorizedAccessException();
            }
        }

        /// <summary>
        /// Throws an exception whether current user is not admin.
        /// </summary>
        /// <param name="principal">The principal.</param>
        /// <exception cref="System.UnauthorizedAccessException">Current user is not admin.</exception>
        public static void EnsureAdmin(this IPrincipal principal)
        {
            if (!principal.IsInRole("Admin"))
            {
                throw new UnauthorizedAccessException();
            }
        }
    }
}
