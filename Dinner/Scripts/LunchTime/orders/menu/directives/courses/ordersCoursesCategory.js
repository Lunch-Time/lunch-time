/**
 * ordersCoursesCategory.
 * @file adminCoursesCategory.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define([], function() {
    'use strict';

    var ordersCoursesCategory = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: '/template/orders/menu/courses/category.tmpl',
                scope: {
                    category: '=',
                    courses: '=',
                    onAddCourseToMenu: '&',
                    onCreateCourse: '&',
                    onRemoveCourse: '&',
                    onEditCourse: '&'
                },
                controller: 'ordersCoursesCategoryController'
            };
        }
    ];

    return ordersCoursesCategory;
});