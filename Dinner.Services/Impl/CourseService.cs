using Dinner.Entities.Course;

namespace Dinner.Services.Impl
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;

    using Dinner.Infrastructure;
    using Dinner.Services.Security;
    using Dinner.Storage;

    internal sealed class CourseService : ICourseService
    {
        private readonly IDinnerPrincipalProvider principalProvider;

        private readonly IAdminDinnerStorage adminDinnerStorage;

        private readonly IUserDinnerStorage userDinnerStorage;

        /// <summary>
        /// Initializes a new instance of the <see cref="CourseService" /> class.
        /// </summary>
        /// <param name="principalProvider">The principal provider.</param>
        /// <param name="adminDinnerStorage">The admin dinner storage.</param>
        /// <param name="userDinnerStorage">The user dinner storage.</param>
        public CourseService(IDinnerPrincipalProvider principalProvider, IAdminDinnerStorage adminDinnerStorage, IUserDinnerStorage userDinnerStorage)
        {
            this.principalProvider = principalProvider;
            this.adminDinnerStorage = adminDinnerStorage;
            this.userDinnerStorage = userDinnerStorage;
        }

        private DinnerPrincipal Principal
        {
            get { return this.principalProvider.Principal; }
        }

        public void RemoveCourse(int courseId)
        {
            this.Principal.EnsureAdmin();
            this.adminDinnerStorage.RemoveCourse(this.Principal.CompanyID, courseId);
        }

        public CourseModel AddCourse(string name, string description, float price, string category, string weight)
        {
            this.Principal.EnsureAdmin();
            var categoryId = this.GetCategory(category);
            var courseId = this.adminDinnerStorage.InsertCourse(
                this.Principal.CompanyID, 
                (int)categoryId, 
                name, 
                description,
                price,
                weight);

            return new CourseModel
                {
                    ID = courseId,
                    Name = name,
                    Price = price,
                    CategoryName = category,
                    CategoryType = categoryId,
                    Description = description,
                    Weight = weight
                };
        }

        public CourseModel UpdateCourse(CourseModel course)
        {
            this.Principal.EnsureAdmin();
            var categoryId = this.GetCategory(course.CategoryName);
            course.ID = this.adminDinnerStorage.InsertOrUpdateCourse(
                this.Principal.CompanyID, 
                course.ID, 
                (int)categoryId, 
                course.Name,
                course.Description, 
                course.Price,
                course.Weight);

            course.CategoryType = categoryId;
            return course;
        }

        public IEnumerable<CourseModel> GetCourses()
        {
            return this.userDinnerStorage.GetAllCourses(this.Principal.CompanyID, false);
        }

        private CourseCategories GetCategory(string category)
        {
            var categories = Enum.GetValues(typeof(CourseCategories));
            return
                categories.OfType<CourseCategories>()
                    .First(item => string.Equals(item.GetAttribute<DisplayAttribute>().Name, category));
        }
    }
}