/**
 * ordersCourse.
 * @file ordersCourse.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define([], function() {
    'use strict';

    var ordersCourse = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: '/template/orders/menu/courses/course.tmpl',
                scope: {
                    course: '=',
                    onAddCourseToMenu: '&',
                    onRemoveCourse: '&',
                    onEditCourse: '&'
                },
                controller: 'ordersCourseController'
            };
        }
    ];

    return ordersCourse;
});