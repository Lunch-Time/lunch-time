/**
 * Course.
 * @file Course.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function (assert) {
    'use strict';
    
    /** 
    * Course.
    * @param {number} id - Course ID.
    * @param {string} name - Course name.
    * @param {number} price - Course price.
    * @param {object} category - Course category.
    * @param {number} maxOrders - Curse maximum orders count.
    * @param {number} ordersCount - Course orders count.
    * @param {string} description - Course description.
    * @param {string} weight - Course weight.
    */
    var Course = function (id, name, price, category, menuItemId, maxOrders, ordersCount, description, weight) {
        assert.isNotNull(id, 'id');
        assert.isNotNull(name, 'name');
        assert.isNotNull(price, 'price');
        assert.isNumber(price, 'price');
        assert.isNotNull(category, 'category');
        assert.isNotNull(menuItemId, 'menuItemId');
        assert.isNotNull(maxOrders, 'maxOrders');
        assert.isNumber(maxOrders, 'maxOrders');
        assert.isNotNull(ordersCount, 'ordersCount');
        assert.isNumber(ordersCount, 'ordersCount');

        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.menuItemId = menuItemId;
        this.maxOrders = maxOrders;
        this.ordersCount = ordersCount;
        this.description = description || '';
        this.weight = weight || '';
    };

    return Course;
});