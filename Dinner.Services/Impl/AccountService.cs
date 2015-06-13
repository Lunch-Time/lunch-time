using System.Security;

using Dinner.Entities;
using Dinner.Entities.Exceptions;
using Dinner.Infrastructure;
using Dinner.Mail.Interfaces;
using Dinner.Mail.Models;
using Dinner.Services.Security;
using Dinner.Storage;

namespace Dinner.Services.Impl
{
    using Dinner.Infrastructure.Security;

    internal sealed class AccountService : IAccountService
    {
        private readonly IDinnerPrincipalProvider principalProvider;

        private readonly IAuthStorage authStorage;

        private readonly IPasswordHashProvider passwordHashProvider;

        private readonly IUserDinnerStorage userDinnerStorage;

        private readonly IRandomStringGenerator stringGenerator;

        private readonly IEmailSystem emailSystem;

        public AccountService(
            IDinnerPrincipalProvider principalProvider, 
            IAuthStorage authStorage, 
            IPasswordHashProvider passwordHashProvider,
            IUserDinnerStorage userDinnerStorage,
            IRandomStringGenerator stringGenerator,
            IEmailSystem emailSystem)
        {
            this.principalProvider = principalProvider;
            this.authStorage = authStorage;
            this.passwordHashProvider = passwordHashProvider;
            this.userDinnerStorage = userDinnerStorage;
            this.stringGenerator = stringGenerator;
            this.emailSystem = emailSystem;
        }

        private DinnerPrincipal Principal
        {
            get { return this.principalProvider.Principal; }
        }

        public void ChangePassword(string password, string newPassword)
        {
            this.Principal.EnsureAuthenticated();
            var user = this.authStorage.GetUser(this.Principal.UserID);

            if (user.Password != this.passwordHashProvider.GetHash(password))
            {
                throw new SecurityException("Failed to change user password: invalid login or password.");
            }

            this.authStorage.ChangePassword(user.ID, this.passwordHashProvider.GetHash(newPassword));
        }

        public void ChangeName(string name)
        {
            this.Principal.EnsureAuthenticated();
            this.authStorage.ChangeName(this.Principal.UserID, name);
        }

        public void ResetPassword(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new EmailNotValidException();
            }
            email = email.Trim();
            // TODO: validate email

            string newPassword = stringGenerator.GenerateUrlSafeBase64EncodedKey(6);
            string newPasswordMD5 = this.passwordHashProvider.GetHash(newPassword);

            this.authStorage.ResetPassword(email, newPasswordMD5);

            emailSystem.SendMail(new ResetPasswordTemplateModel(email, newPassword));
        }

        public UserSettingsModel GetUserSettings()
        {
            this.Principal.EnsureAuthenticated();
            return this.userDinnerStorage.GetUserSettings(this.Principal.UserID);
        }

        public void SetUserSettings(UserSettingsModel model)
        {
            this.Principal.EnsureAuthenticated();
            this.userDinnerStorage.SetUserSettings(model, this.Principal.UserID);
        }

        public bool UnsubscribeUser(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return false;
            }
            email = email.Trim();

            AuthUserModel user = this.authStorage.GetUser(email);
            if (user == null)
            {
                return false;
            }
            this.userDinnerStorage.SetUserSettings(
                new UserSettingsModel
                {
                    SendAdminNotification = false,
                    SendChangedOrderNotification = false,
                    SendWeeklyNotification = false,
                    SendDailyNotification = false
                },
                user.ID);
            return true;
        }

        public bool UnsubscribeUser(int userId)
        {
            if (userId <= 0)
            {
                return false;
            }

            AuthUserModel user = this.authStorage.GetUser(userId);
            if (user == null)
            {
                return false;
            }
            this.userDinnerStorage.SetUserSettings(
                new UserSettingsModel
                {
                    SendAdminNotification = false,
                    SendChangedOrderNotification = false,
                    SendWeeklyNotification = false,
                    SendDailyNotification = false
                },
                user.ID);
            return true;
        }
    }
}