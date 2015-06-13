/**
 * userMenuCourse.
 * @file userMenuCourse.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    var userMenuCourse = [
        function() {

            return {
                restrict: 'AE',
                templateUrl: '/template/user/menu/courses/course.tmpl',
                scope: {
                    course: '=',
                    isFreezed: '=',
                    isWished: '=',
                    onOrderCourse: '&',
                    onWishCourse: '&'
                },
                controller: 'userMenuCourseController'
            };
        }
    ];

    return userMenuCourse;
});