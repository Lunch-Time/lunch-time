/**
 * Category.
 * @file category.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function (assert) {
    'use strict';

    /** 
    * Menu category.
    * @param {number} id - Category ID.
    * @param {string} name - Category name.
    */
    var Category = function (id, name) {
        assert.isNotNull(id, 'id');
        assert.isNotNull(name, 'name');

        this.id = id;
        this.name = name;
    };

    return Category;
});