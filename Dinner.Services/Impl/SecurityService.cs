namespace Dinner.Services.Impl
{
    using Dinner.Entities;
    using Dinner.Infrastructure.Log;
    using Dinner.Infrastructure.Security;
    using Dinner.Services.Security;
    using Dinner.Storage;

    internal sealed class SecurityService : ISecurityService
    {
        /// <summary>
        /// The authentication storage.
        /// </summary>
        private readonly IAuthStorage authStorage;

        /// <summary>
        /// The password hash provider.
        /// </summary>
        private readonly IPasswordHashProvider passwordHashProvider;

        /// <summary>
        /// The event log.
        /// </summary>
        private readonly IEventLog eventLog;

        /// <summary>
        /// Initializes a new instance of the <see cref="SecurityService" /> class.
        /// </summary>
        /// <param name="authStorage">The authentication storage.</param>
        /// <param name="passwordHashProvider">The password hash provider.</param>
        /// <param name="eventLog">The event log.</param>
        public SecurityService(IAuthStorage authStorage, IPasswordHashProvider passwordHashProvider, IEventLog eventLog)
        {
            this.authStorage = authStorage;
            this.passwordHashProvider = passwordHashProvider;
            this.eventLog = eventLog;
        }

        /// <inheritdoc />
        public DinnerPrincipal GetPrincipal(int? userId)
        {
            AuthUserModel userModel = null;

            if (userId.HasValue)
            {
                userModel = this.authStorage.GetUser(userId.Value);
            }

            return new DinnerPrincipal(userModel ?? new UnauthorizeUserModel());
        }

        /// <inheritdoc />
        public DinnerPrincipal Login(string login, string password)
        {
            var userModel = this.authStorage.GetUser(login, this.passwordHashProvider.GetHash(password));
            return new DinnerPrincipal(userModel ?? new UnauthorizeUserModel());
        }

        /// <inheritdoc />
        public void Register(string userDisplayName, string userName, string password)
        {
            this.authStorage.RegisterUser(1, userDisplayName, userName, this.passwordHashProvider.GetHash(password));
            this.eventLog.LogInformation("Registered new user {0} ({1})", userName, userDisplayName);
        }
    }
}
