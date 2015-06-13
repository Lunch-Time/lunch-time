using Dinner.Entities;
using Dinner.Entities.Course;
using Dinner.Entities.MenuItem;

namespace Dinner.Services.Impl
{
    using System;
    using System.Collections.Generic;

    using Dinner.Services.Security;
    using Dinner.Storage;

    internal sealed class MenuService : IMenuService
    {
        private readonly IDinnerPrincipalProvider principalProvider;

        private readonly IUserDinnerStorage userDinnerStorage;

        private readonly IAdminDinnerStorage adminDinnerStorage;

        /// <summary>
        /// Initializes a new instance of the <see cref="MenuService"/> class.
        /// </summary>
        /// <param name="principalProvider">The principal provider.</param>
        /// <param name="userDinnerStorage">The user dinner storage.</param>
        /// <param name="adminDinnerStorage">The admin dinner storage.</param>
        public MenuService(IDinnerPrincipalProvider principalProvider, IUserDinnerStorage userDinnerStorage, IAdminDinnerStorage adminDinnerStorage)
        {
            this.principalProvider = principalProvider;
            this.userDinnerStorage = userDinnerStorage;
            this.adminDinnerStorage = adminDinnerStorage;
        }

        private DinnerPrincipal Principal
        {
            get { return this.principalProvider.Principal; }
        }

        public int AddOrUpdateCourseToMenu(int courseId, DateTime date, int limit)
        {
            this.Principal.EnsureAdmin();
            return this.adminDinnerStorage.AddOrUpdateCourseToMenu(courseId, date, limit);
        }

        public void RemoveCourseFromMenu(int courseId, DateTime date)
        {
            this.Principal.EnsureAdmin();
            this.adminDinnerStorage.RemoveCourseFromMenu(courseId, date);
        }
        
        public IEnumerable<CourseModel> GetDayMenu(DateTime date)
        {
            return this.userDinnerStorage.GetDayMenu(this.Principal.CompanyID, date);
        }
    }
}