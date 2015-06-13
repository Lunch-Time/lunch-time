namespace Dinner.Services.Security
{
    using System.Security.Principal;

    using Dinner.Entities;
    using Dinner.Infrastructure;

    /// <summary>
    /// The dinner principle.
    /// </summary>
    public class DinnerPrincipal : IPrincipal
    {
        /// <summary>
        /// The user model.
        /// </summary>
        private readonly AuthUserModel userModel;

        /// <summary>
        /// Initializes a new instance of the <see cref="DinnerPrincipal"/> class.
        /// </summary>
        /// <param name="userModel">The user model.</param>
        public DinnerPrincipal(AuthUserModel userModel)
        {
            this.userModel = userModel;
            this.Identity = new GenericIdentity(userModel.IsAuthenticated ? userModel.Login : string.Empty);
        }

        /// <inheritdoc />
        public IIdentity Identity { get; private set; }

        /// <summary>
        /// Gets the user unique identifier.
        /// </summary>
        public int UserID
        {
            get { return this.userModel.ID; }
        }

        /// <summary>
        /// Gets the name.
        /// </summary>
        public string Name
        {
            get { return this.userModel.Name; }
        }

        /// <summary>
        /// Gets the company unique identifier.
        /// </summary>
        public int CompanyID
        {
            get { return this.userModel.CompanyID; }
        }

        public bool IsInRole(string role)
        {
            if (role.EqualsIgnoreCase("Admin"))
            {
                return this.userModel.IsAdmin;
            }
            
            if (role.EqualsIgnoreCase("User"))
            {
                return this.userModel.IsAuthenticated;
            }

            return false;
        }
    }
}