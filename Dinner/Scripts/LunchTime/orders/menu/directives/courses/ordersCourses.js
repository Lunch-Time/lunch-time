/**
 * ordersCourses.
 * @file ordersCourses.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define([], function() {
    'use strict';

    var ordersCourses = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: '/template/orders/menu/courses.tmpl',
                scope: {
                    courses: '=',
                    onAddCourseToMenu: '&'
                },
                controller: 'ordersCoursesController'
            };
        }
    ];

    return ordersCourses;
});