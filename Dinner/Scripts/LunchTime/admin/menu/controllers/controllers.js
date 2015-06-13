/**
 * controllers.
 * @file controllers.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'admin/menu/controllers/adminManageMenuController',
        'admin/menu/controllers/adminAddCourseToMenuController',
        'admin/menu/controllers/menu/adminMenuController',
        'admin/menu/controllers/menu/adminMenuCourseController',
        'admin/menu/controllers/menu/adminMenuCourseChangeMaxOrdersController',
        'admin/menu/controllers/courses/adminCoursesController',
        'admin/menu/controllers/courses/adminCoursesCategoryController',
        'admin/menu/controllers/courses/adminCourseController',
        'admin/menu/controllers/courses/adminCourseEditController'
    ],
    function(angular,
        adminManageMenuController, adminAddCourseToMenuController,
        adminMenuController, adminMenuCourseController, adminMenuCourseChangeMaxOrdersController,
        adminCoursesController, adminCoursesCategoryController, adminCourseController, adminCourseEditController) {
        'use strict';

        var dependencies = [];
        var controllers = angular.module('lunchtime.admin.menu.controllers', dependencies);

        // Manage
        controllers.controller('adminManageMenuController', adminManageMenuController);
        controllers.controller('adminAddCourseToMenuController', adminAddCourseToMenuController);

        // Menu
        controllers.controller('adminMenuController', adminMenuController);
        controllers.controller('adminMenuCourseController', adminMenuCourseController);
        controllers.controller('adminMenuCourseChangeMaxOrdersController', adminMenuCourseChangeMaxOrdersController);

        // Courses
        controllers.controller('adminCoursesController', adminCoursesController);
        controllers.controller('adminCoursesCategoryController', adminCoursesCategoryController);
        controllers.controller('adminCourseController', adminCourseController);
        controllers.controller('adminCourseEditController', adminCourseEditController);

        return controllers;
    });