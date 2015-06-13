/**
 * adminCourses.
 * @file adminCourses.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function() {
    'use strict';

    var adminCourses = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: '/template/admin/menu/courses.tmpl',
                scope: {
                    courses: '=',
                    onAddCourseToMenu: '&'
                },
                controller: 'adminCoursesController'
            };
        }
    ];

    return adminCourses;
});