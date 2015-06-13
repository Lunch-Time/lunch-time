/**
 * adminCoursesCategory.
 * @file adminCoursesCategory.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function() {
    'use strict';

    var adminCoursesCategory = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: '/template/admin/menu/courses/category.tmpl',
                scope: {
                    category: '=',
                    courses: '=',
                    onAddCourseToMenu: '&',
                    onCreateCourse: '&',
                    onRemoveCourse: '&',
                    onEditCourse: '&'
                },
                controller: 'adminCoursesCategoryController'
            };
        }
    ];

    return adminCoursesCategory;
});