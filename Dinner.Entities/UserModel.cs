using System.Diagnostics.CodeAnalysis;

namespace Dinner.Entities
{
    public class UserModel
    {
        public UserModel(int id, int companyID, string name)
        {
            ID = id;
            Name = name;
            CompanyID = companyID;
        }

        public int ID { get; private set; }
        public string Name { get; private set; }
        public int CompanyID { get; private set; }
    }

    [SuppressMessage(
        "StyleCop.CSharp.MaintainabilityRules", 
        "SA1402:FileMayOnlyContainASingleClass", 
        Justification = "Reviewed. Suppression is OK here.")]
    public class AuthUserModel : UserModel
    {
        public AuthUserModel(int id, int companyID, string name, int roleID, string login, string password)
            : base(id, companyID, name)
        {
            RoleID = roleID;
            Login = login;
            Password = password;
        }

        public int RoleID { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        public bool IsAdmin
        {
            get { return RoleID == 2; }
        }

        public virtual bool IsAuthenticated
        {
            get { return true; }
        }
    }

    [SuppressMessage(
        "StyleCop.CSharp.MaintainabilityRules",
        "SA1402:FileMayOnlyContainASingleClass",
        Justification = "Reviewed. Suppression is OK here.")]
    public class UnauthorizeUserModel : AuthUserModel
    {
        public UnauthorizeUserModel()
            : base(0, 1, string.Empty, 1, string.Empty, string.Empty)
        {
        }

        public override bool IsAuthenticated
        {
            get { return false; }
        }
    }
}
