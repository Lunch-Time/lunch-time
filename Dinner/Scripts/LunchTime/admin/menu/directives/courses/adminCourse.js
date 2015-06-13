/**
 * adminCourse.
 * @file adminCourse.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function() {
    'use strict';

    var adminCourse = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: '/template/admin/menu/courses/course.tmpl',
                scope: {
                    course: '=',
                    onAddCourseToMenu: '&',
                    onRemoveCourse: '&',
                    onEditCourse: '&'
                },
                controller: 'adminCourseController'
            };
        }
    ];

    return adminCourse;
});