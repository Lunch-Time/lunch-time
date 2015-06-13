using System.Data.SqlClient;
using System.Linq;

using Dinner.Entities;
using Dinner.Entities.Exceptions;
using Dinner.Storage.Repository;

namespace Dinner.Storage.Impl
{
    using System;

    internal sealed class AuthStorage : IAuthStorage
    {
        private readonly IDataContextFactory dataContextFactory;

        public AuthStorage(IDataContextFactory dataContextFactory)
        {
            this.dataContextFactory = dataContextFactory;
        }

        public void RegisterUser(int companyId, string name, string login, string passwordMd5)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                try
                {
                    dataContext.p_CustomerUser_Insert(companyId, name, login, passwordMd5, 1);
                }
                catch (Exception ex)
                {
                    var sqlException = ex.InnerException as SqlException;
                    if (sqlException != null)
                    {
                        if (sqlException.Class == 16)
                        {
                            throw new UserAlreadyExistsException(); 
                        }
                    }
                    throw;
                }
            }
        }

        public void ChangePassword(int userId, string newPasswordMd5)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                var user = dataContext.Users.Single(x => x.ID == userId);
                user.Password = newPasswordMd5;
                dataContext.SaveChanges();
            }
        }

        public void ChangeName(int userId, string name)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                var user = dataContext.Users.SingleOrDefault(x => x.ID == userId);
                if (user != null)
                {
                    user.Name = name;
                    dataContext.SaveChanges();
                }
                else
                {
                    throw new Exception("Failed to change user name.");
                }
            }
        }

        public void ResetPassword(string email, string newPasswordMd5)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                var user = dataContext.Users.SingleOrDefault(x => x.Login == email);
                if (user == null)
                {
                    throw new UserNotFoundException();
                }
                user.NewPassword = newPasswordMd5;
                dataContext.SaveChanges();
            }
        }

        public bool Validate(string login, string passwordMd5)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                var user = dataContext.Users.SingleOrDefault(x => x.Login == login && x.Password == passwordMd5);
                if (user == null)
                {
                    user = dataContext.Users.SingleOrDefault(x => x.Login == login && x.NewPassword == passwordMd5);
                }
                return user != null;
            }
        }

        public AuthUserModel GetUser(string login, string passwordMd5)
        {
            AuthUserModel userModel = null;
            using (var dataContext = this.dataContextFactory.Create())
            {
                string password = null;
                var user = dataContext.Users.SingleOrDefault(x => x.Login == login && x.Password == passwordMd5);
                if (user == null)
                {
                    user = dataContext.Users.SingleOrDefault(x => x.Login == login && x.NewPassword == passwordMd5);
                    if (user != null)
                    {
                        password = passwordMd5;
                        user.Password = passwordMd5;
                        user.NewPassword = null;
                        dataContext.SaveChanges();
                    }
                }
                else
                {
                    password = user.Password;
                }

                if (user != null)
                {
                    userModel = new AuthUserModel(
                        user.ID, 
                        user.CompanyID, 
                        user.Name, 
                        user.RoleID, 
                        user.Login,
                        password);
                }
            }
            return userModel;
        }

        public AuthUserModel GetUser(int userId)
        {
            AuthUserModel userModel = null;
            using (var dataContext = this.dataContextFactory.Create())
            {
                var user = dataContext.Users.SingleOrDefault(x => x.ID == userId);
                if (user != null)
                {
                    userModel = new AuthUserModel(
                        user.ID,
                        user.CompanyID,
                        user.Name,
                        user.RoleID,
                        user.Login,
                        user.Password);
                }
            }
            return userModel;
        }

        public AuthUserModel GetUser(string email)
        {
            AuthUserModel userModel = null;
            using (var dataContext = this.dataContextFactory.Create())
            {
                var user = dataContext.Users.SingleOrDefault(x => x.Login == email);
                if (user != null)
                {
                    userModel = new AuthUserModel(
                        user.ID,
                        user.CompanyID,
                        user.Name,
                        user.RoleID,
                        user.Login,
                        user.Password);
                }
            }
            return userModel;
        }
    }
}
