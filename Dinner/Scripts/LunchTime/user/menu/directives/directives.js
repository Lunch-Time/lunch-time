/**
 * directives.
 * @file directives.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'user/menu/directives/courses/userMenuCourses',
        'user/menu/directives/courses/userMenuCourse',
        'user/menu/directives/courses/userMenuCoursesView',
        'user/menu/directives/orders/userMenuOrders',
        'user/menu/directives/orders/userMenuOrder'
    ],
    function(angular, userMenuCourses, userMenuCourse, userMenuCoursesView, userMenuOrders, userMenuOrder) {
        'use strict';

        var dependencies = [];
        var directives = angular.module('lunchtime.user.menu.directives', dependencies);

        // Menu
        directives.directive('ltUserMenuCourses', userMenuCourses);
        directives.directive('ltUserMenuCourse', userMenuCourse);
        directives.directive('ltUserMenuCoursesView', userMenuCoursesView);

        // Orders
        directives.directive('ltUserMenuOrders', userMenuOrders);
        directives.directive('ltUserMenuOrder', userMenuOrder);

        return directives;
    });