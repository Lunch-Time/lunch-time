/**
 * menuData.
 * @file menuData.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function (assert) {
    'use strict';

    /** 
    * Menu Data.
    * @param {date} date - Menu date.
    * @param {boolean} isFreezed - Is menu freezed.
    * @param {object} freezeTime - Menu freeze time.
    * @param {array} courses - Menu courses.
    * @param {array} orders - Ordered courses.
    * @param {array} wishedCourses - Wished courses.
    */
    var MenuData = function (date, isFreezed, freezeTime, courses, orders, wishedCourses) {
        this.date = date;
        this.isFreezed = isFreezed;
        this.freezeTime = freezeTime;
        this.courses = courses;
        this.orders = orders;
        this.wishedCourses = wishedCourses || null;
    };

    return MenuData;
});