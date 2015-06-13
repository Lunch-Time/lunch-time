/**
 * directives.
 * @file directives.js.
 * @copyright Copyright ©
 */
define([
        'angular',
        'orders/menu/directives/menu/ordersMenu',
        'orders/menu/directives/menu/ordersMenuCourse',
        'orders/menu/directives/courses/ordersCourses',
        'orders/menu/directives/courses/ordersCoursesCategory',
        'orders/menu/directives/courses/ordersCourse'
    ],
    function (angular, ordersMenu, ordersMenuCourse, ordersCourses, ordersCoursesCategory, ordersCourse) {
        'use strict';

        var dependencies = [];
        var directives = angular.module('lunchtime.orders.menu.directives', dependencies);

        // Menu
        directives.directive('ltOrdersMenu', ordersMenu);
        directives.directive('ltOrdersMenuCourse', ordersMenuCourse);

        // Courses
        directives.directive('ltOrdersCourses', ordersCourses);
        directives.directive('ltOrdersCoursesCategory', ordersCoursesCategory);
        directives.directive('ltOrdersCourse', ordersCourse);

        return directives;
    });