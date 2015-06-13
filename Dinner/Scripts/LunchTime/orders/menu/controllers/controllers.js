/**
 * controllers.
 * @file controllers.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'orders/menu/controllers/ordersManageMenuController',
        'orders/menu/controllers/ordersAddCourseToMenuController',
        'orders/menu/controllers/menu/ordersMenuController',
        'orders/menu/controllers/menu/ordersMenuCourseController',
        'orders/menu/controllers/menu/ordersMenuCourseChangeMaxOrdersController',
        'orders/menu/controllers/courses/ordersCoursesController',
        'orders/menu/controllers/courses/ordersCoursesCategoryController',
        'orders/menu/controllers/courses/ordersCourseController',
        'orders/menu/controllers/courses/ordersCourseEditController'
    ],
    function(angular,
        ordersManageMenuController, ordersAddCourseToMenuController,
        ordersMenuController, ordersMenuCourseController, ordersMenuCourseChangeMaxOrdersController,
        ordersCoursesController, ordersCoursesCategoryController, ordersCourseController, ordersCourseEditController) {
        'use strict';

        var dependencies = [];
        var controllers = angular.module('lunchtime.orders.menu.controllers', dependencies);

        // Manage
        controllers.controller('ordersManageMenuController', ordersManageMenuController);
        controllers.controller('ordersAddCourseToMenuController', ordersAddCourseToMenuController);

        // Menu
        controllers.controller('ordersMenuController', ordersMenuController);
        controllers.controller('ordersMenuCourseController', ordersMenuCourseController);
        controllers.controller('ordersMenuCourseChangeMaxOrdersController', ordersMenuCourseChangeMaxOrdersController);

        // Courses
        controllers.controller('ordersCoursesController', ordersCoursesController);
        controllers.controller('ordersCoursesCategoryController', ordersCoursesCategoryController);
        controllers.controller('ordersCourseController', ordersCourseController);
        controllers.controller('ordersCourseEditController', ordersCourseEditController);

        return controllers;
    });