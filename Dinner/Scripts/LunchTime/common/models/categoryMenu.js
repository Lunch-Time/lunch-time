/**
 * Category menu.
 * @file categoryMenu.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function (assert) {
    'use strict';

    /** 
    * Category menu.
    * @param {object} category - Category.
    * @param {array} courses - Category courses.
    */
    var CategoryMenu = function(category, courses) {
        assert.isNotNull(category, 'category');
        assert.isNotNull(courses, 'courses');
        assert.isArray(courses, 'courses');

        this.category = category;
        this.courses = courses;
    };

    return CategoryMenu;
});