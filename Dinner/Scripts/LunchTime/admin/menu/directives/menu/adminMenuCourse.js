/**
 * adminMenuCourse.
 * @file adminMenuCourse.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function() {
    'use strict';

    var adminMenuCourse = [
        function() {

            return {
                restrict: 'AE',
                templateUrl: '/template/admin/menu/menu/course.tmpl',
                scope: {
                    course: '=',
                    onRemoveCourse: '&',
                    onChangeCourseMaxOrders: '&'
                },
                controller: 'adminMenuCourseController'
            };
        }
    ];

    return adminMenuCourse;
});