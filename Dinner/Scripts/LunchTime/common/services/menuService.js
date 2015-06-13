/**
 * menuService.
 * @file menuService.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'framework/assert', 'common/models/categoryMenu'], function (_, assert, CategoryMenu) {
    'use strict';

    var menuService = [
        'categoryService',
        function(categoryService) {
            return {

                /** 
                * Group courses by category.
                * @param {array} courses - Courses.
                * @returns {array} Categories menus.
                */
                groupCoursesByCategories: function(courses) {
                    assert.isArray(courses, 'courses');

                    var categoriesMenus = _.chain(courses)
                        // Group courses by categories
                        .groupBy(function(course) {
                            return course.category.id;
                        })
                        // Map to [categoryId, course] pairs
                        .pairs()
                        // Map to CategoryMenu.
                        .map(function(categoryCoursesPair) {
                            var categoryId = parseInt(categoryCoursesPair[0], 10);

                            var categoryCourses = _.sortBy(categoryCoursesPair[1], function(course) {
                                return course.name;
                            });

                            var category = categoryService.getCategoryById(categoryId);

                            return new CategoryMenu(category, categoryCourses);
                        })
                        // Order by CategoryID
                        .sortBy(function(categoryMenu) {
                            return categoryMenu.category.id;
                        })
                        .value();

                    return categoriesMenus;
                },

                /** 
                 * Update categories menu.
                 * @param {array} categoriesMenus - Categories menus.
                 * @param {array} courses - Courses.
                 */
                updateCategoriesMenus: function (categoriesMenus, courses) {
                    var categoriesMenuMap = {};

                    _.each(categoriesMenus, function(categoryMenu) {
                        categoryMenu.courses = [];
                        categoriesMenuMap[categoryMenu.category.id] = categoryMenu;
                    });

                    _.each(courses, function(course) {
                        var courseCategoryMenu = categoriesMenuMap[course.category.id];
                        courseCategoryMenu.courses.push(course);
                    });
                }
            };
        }
    ];

    return menuService;
});