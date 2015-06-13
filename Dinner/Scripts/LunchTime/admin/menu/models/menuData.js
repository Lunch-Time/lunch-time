/**
 * Menu Data.
 * @file menuData.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function (assert) {
    'use strict';

    /** 
    * Menu Data.
    * @param {date} date - Menu date.
    * @param {array} menuCourses - Menu courses.
    * @param {array} availableCourses - Available courses.
    */
    var MenuData = function (date, menuCourses, availableCourses) {
        assert.isNotNull(date, 'date');
        assert.isArray(menuCourses, 'menuCourses');
        assert.isArray(availableCourses, 'availableCourses');

        this.date = date;
        this.menuCourses = menuCourses;
        this.availableCourses = availableCourses;
    };

    return MenuData;
});