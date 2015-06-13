using System;
using System.Collections.Generic;

using Dinner.Entities;
using Dinner.Entities.Course;

namespace Dinner.Storage
{
    public interface IAdminDinnerStorage
    {
        int InsertCourse(
            int companyID, 
            int courseCategoryId, 
            string name, 
            string description, 
            float price, 
            string weight);

        int InsertOrUpdateCourse(
            int companyID, 
            int? courseID, 
            int courseCategoryId, 
            string name, 
            string description, 
            float price, 
            string weight);

        void RemoveCourse(int companyID, int courseId);

        IEnumerable<OrderedMenuModel> GetAllOrdersByDate(int companyID, DateTime date);

        int AddOrUpdateCourseToMenu(int courseId, DateTime date, int limit);
        void RemoveCourseFromMenu(int courseId, DateTime date);
    }
}
