using Dinner.Services.Security;

namespace Dinner.Controllers.Api
{
    using System;
    using System.Web.Http;

    using Dinner.Attributes;
    using Dinner.Entities.Course;
    using Dinner.Models;
    using Dinner.Services;
    using Dinner.ViewModels.Admin;

    [System.Web.Mvc.Authorize]
    [Admin]
    public class AdminController : ApiController
    {
        private readonly IMenuService menuService;

        private readonly ICourseService courseService;

        private readonly IImageService imageService;

        private readonly IDinnerPrincipalProvider principalProvider;

        public AdminController(
            IMenuService menuService,
            ICourseService courseService,
            IImageService imageService,
            IDinnerPrincipalProvider principalProvider)
        {
            this.menuService = menuService;
            this.courseService = courseService;
            this.imageService = imageService;
            this.principalProvider = principalProvider;
        }

        [ActionName("GetMenuAndCourses")]
        public MenuFormationModel GetMenuAndCourses(DateTime date)
        {
            var menuCourses = this.menuService.GetDayMenu(date);
            var availableCourses = this.courseService.GetCourses();

            var model = new MenuFormationModel
            {
                Date = date,
                MenuCourses = menuCourses,
                AvailableCourses = availableCourses
            };

            return model;
        }

        [HttpPost]
        [ActionName("RemoveCourseFromMenu")]
        public void RemoveCourseFromMenu(RemoveCourseFromMenuViewModel viewModel)
        {
            this.menuService.RemoveCourseFromMenu(viewModel.CourseId, viewModel.Date);
        }


        [HttpPost]
        [ActionName("ChangeMaxOrders")]
        public void ChangeMaxOrders(ChangeMaxOrdersViewModel viewModel)
        {
            this.menuService.AddOrUpdateCourseToMenu(viewModel.CourseId, viewModel.Date, viewModel.MaxOrders);
        }

        [HttpPost]
        [ActionName("AddCourseToMenu")]
        public int AddCourseToMenu(AddCourseToMenuViewModel viewModel)
        {
            var id = this.menuService.AddOrUpdateCourseToMenu(viewModel.CourseId, viewModel.Date, viewModel.MaxOrders);
            return id;
        }   
        
        [HttpPost]
        [ActionName("CreateCourse")]
        public CourseModel CreateCourse(CreateCourseViewModel viewModel)
        {
            var course = this.courseService.AddCourse(
                viewModel.Name,
                viewModel.Description,
                viewModel.Price,
                viewModel.Category,
                viewModel.Weight);

            
            if (!string.IsNullOrEmpty(viewModel.ImageId))
            {
                imageService.UpdateCoursePicture(viewModel.ImageId, principalProvider.Principal.CompanyID, course.ID);
            }

            return course;
        }

        [HttpPost]
        [ActionName("UpdateCourse")]
        public CourseModel UpdateCourse(UpdateCourseViewModel viewModel)
        {
            var course = new CourseModel
                {
                    ID = viewModel.ID,
                    CategoryName = viewModel.Category,
                    CompanyID = principalProvider.Principal.CompanyID,
                    Name = viewModel.Name,
                    Description = viewModel.Description,
                    Price = viewModel.Price,
                    Weight = viewModel.Weight
                };
            
            var updatedCourse = this.courseService.UpdateCourse(course);

            if (!string.IsNullOrEmpty(viewModel.ImageId))
            {
                imageService.UpdateCoursePicture(viewModel.ImageId, updatedCourse.CompanyID, updatedCourse.ID);
            }

            return updatedCourse;
        }    
        
        [HttpPost]
        [ActionName("RemoveCourse")]
        public void RemoveCourse(RemoveCourseViewModel viewModel)
        {
            this.courseService.RemoveCourse(viewModel.CourseId);
        }
    }
}