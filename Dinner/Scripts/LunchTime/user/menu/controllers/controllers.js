/**
 * controllers.
 * @file controllers.js.
 * @copyright Copyright ©
 */
define([
        'angular', 'core/core',
        'user/menu/controllers/userMenuController',
        'user/menu/controllers/anonymousUserMenuController',
        'user/menu/controllers/courses/userMenuCoursesController',
        'user/menu/controllers/courses/userMenuCourseController',
        'user/menu/controllers/courses/userMenuCoursesViewController',
        'user/menu/controllers/orders/userMenuOrdersController',
        'user/menu/controllers/orders/userMenuOrderController'
    ],
    function (angular, core,
        userMenuController, anonymousUserMenuController,
        userMenuCoursesController, userMenuCourseController, userMenuCoursesViewController,
        userMenuOrdersController, userMenuOrderController) {
        'use strict';

        var dependencies = [core.name];
        var controllers = angular.module('lunchtime.user.menu.controllers', dependencies);

        controllers.controller('userMenuController', userMenuController);
        controllers.controller('anonymousUserMenuController', anonymousUserMenuController);

        // Courses
        controllers.controller('userMenuCoursesController', userMenuCoursesController);
        controllers.controller('userMenuCourseController', userMenuCourseController);
        controllers.controller('userMenuCoursesViewController', userMenuCoursesViewController);

        // Orders
        controllers.controller('userMenuOrdersController', userMenuOrdersController);
        controllers.controller('userMenuOrderController', userMenuOrderController);

        return controllers;
    });