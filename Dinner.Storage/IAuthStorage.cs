using Dinner.Entities;

namespace Dinner.Storage
{
    public interface IAuthStorage
    {
        void RegisterUser(int companyId, string name, string login, string passwordMd5);
        void ChangePassword(int userId, string passwordMd5);
        void ChangeName(int userId, string name);
        void ResetPassword(string email, string newPasswordMd5);
        bool Validate(string login, string passwordMd5);
        AuthUserModel GetUser(string login, string passwordMd5);
        AuthUserModel GetUser(int userId);
        AuthUserModel GetUser(string email);
    }
}
