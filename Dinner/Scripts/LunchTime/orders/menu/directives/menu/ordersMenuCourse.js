/**
 * adminMenuCourse.
 * @file adminMenuCourse.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define([], function() {
    'use strict';

    var ordersMenuCourse = [
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

    return ordersMenuCourse;
});