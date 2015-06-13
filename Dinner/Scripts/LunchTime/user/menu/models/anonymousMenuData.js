/**
 * anonymousMenuData.
 * @file anonymousMenuData.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function () {
    'use strict';

    /** 
    * Menu Data.
    * @param {date} date - Menu date.
    * @param {array} courses - Menu courses.
    */
    var AnonymousMenuData = function (date, courses) {
        this.date = date;
        this.courses = courses;
    };

    return AnonymousMenuData;
});