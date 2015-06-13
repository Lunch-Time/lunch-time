/**
 * directives.
 * @file directives.js.
 * @copyright Copyright ©
 */
define([
        'angular',
        'admin/menu/directives/menu/adminMenu',
        'admin/menu/directives/menu/adminMenuCourse',
        'admin/menu/directives/courses/adminCourses',
        'admin/menu/directives/courses/adminCoursesCategory',
        'admin/menu/directives/courses/adminCourse'
    ],
    function (angular, adminMenu, adminMenuCourse, adminCourses, adminCoursesCategory, adminCourse) {
        'use strict';

        var dependencies = [];
        var directives = angular.module('lunchtime.admin.menu.directives', dependencies);

        // Menu
        directives.directive('ltAdminMenu', adminMenu);
        directives.directive('ltAdminMenuCourse', adminMenuCourse);

        // Courses
        directives.directive('ltAdminCourses', adminCourses);
        directives.directive('ltAdminCoursesCategory', adminCoursesCategory);
        directives.directive('ltAdminCourse', adminCourse);

        return directives;
    });