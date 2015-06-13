/**
 * Menu.
 * @file menu.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function (assert) {
    'use strict';

    /** 
    * Menu.
    * @param {date} date - Menu date.
    * @param {boolean} isFreezed - Is menu freezed.
    * @param {array} categories - Menu categories.
    */
    var Menu = function (date, isFreezed, categories) {
        assert.isNotNull(date, 'date');
        assert.isNotNull(isFreezed, 'isFreezed');
        assert.isNotNull(categories, 'categories');
        assert.isArray(categories, 'categories');
        
        this.date = date;
        this.isFreezed = isFreezed;
        this.categories = categories;
    };

    return Menu;
});