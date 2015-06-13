using System;
using System.Collections.Generic;
using System.Linq;

using Dinner.Entities;
using Dinner.Entities.Course;

namespace Dinner.Storage.Impl
{
    using Dinner.Storage.Repository;

    internal sealed class AdminDinnerStorage : IAdminDinnerStorage
    {
        private readonly IDataContextFactory dataContextFactory;

        public AdminDinnerStorage(IDataContextFactory dataContextFactory)
        {
            this.dataContextFactory = dataContextFactory;
        }

        public int InsertCourse(
            int companyID, 
            int courseCategoryId, 
            string name, 
            string description, 
            float price,
            string weight)
        {
            return InsertOrUpdateCourse(companyID, null, courseCategoryId, name, description, price, weight);
        }

        public int InsertOrUpdateCourse(
            int companyID, 
            int? courseID, 
            int courseCategoryId, 
            string name, 
            string description, 
            float price,
            string weight)
        {
            int courseId;

            using (var dataContext = this.dataContextFactory.Create())
            {
                var res = dataContext.p_UpsertCourse(
                    companyID,
                    courseID,
                    courseCategoryId,
                    name,
                    description,
                    (decimal)price,
                    weight).SingleOrDefault();
                if (res == null || !res.ID.HasValue)
                {
                    throw new NotSupportedException();
                }
                courseId = res.ID.Value;
            }
            return courseId;
        }

        public void RemoveCourse(int companyID, int courseId)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                dataContext.p_DeleteCourse(companyID, courseId);
            }
        }

        public IEnumerable<OrderedMenuModel> GetAllOrdersByDate(int companyID, DateTime date)
        {
            var result = new List<OrderedMenuModel>();
            using (var dataContext = this.dataContextFactory.Create())
            {
                var list = dataContext.p_GetAllOrdersByDate(companyID, date);
                foreach (var item in list)
                {
                    result.Add(new OrderedMenuModel
                    {
                        Course = new CourseModel
                        {
                            CategoryName = item.CourseCategoryName,
                            CategoryType = (CourseCategories)item.CourseCategoryID,
                            ID = item.CourseID,
                            CompanyID = companyID,
                            Name = item.CourseName,
                            Price = (float)item.CoursePrice,
                            Description = item.CourseDescription,
                            Weight = item.Weight
                        },
                        Quantity = (float)item.Quantity,
                        IsPurchased = item.IsPurchased
                    });
                }
            }
            return result;
        }

        public int AddOrUpdateCourseToMenu(int courseId, DateTime date, int limit)
        {
            int result;
            using (var dataContext = this.dataContextFactory.Create())
            {
                var res = dataContext.p_UpsertCourseToMenu(courseId, date, limit).SingleOrDefault();
                if (res == null)
                {
                   throw new NotSupportedException(); 
                }
                result = res.ID;
            }
            return result;
        }

        public void RemoveCourseFromMenu(int courseId, DateTime date)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                dataContext.p_DeleteCourseFromMenu(courseId, date);
            }
        }
    }
}
