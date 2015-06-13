namespace Dinner.Services
{
    using Dinner.Entities;

    public interface IAccountService
    {
        void ChangePassword(string password, string newPassword);

        void ChangeName(string name);

        void ResetPassword(string email);
        
        UserSettingsModel GetUserSettings();

        void SetUserSettings(UserSettingsModel model);

        bool UnsubscribeUser(string email);

        bool UnsubscribeUser(int userId);
    }
}