/**
 * box.
 * @file box.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function (assert) {
    'use strict';

    /** 
    * Ordered box.
    * @param {number} index - Box index.
    * @param {array} orders - Box orders.
    */
    var Box = function (index, orders) {
        assert.isNotNull(index, 'index');
        assert.isNotNull(orders, 'orders');
        assert.isArray(orders, 'orders');

        this.index = index;
        this.orders = orders;
        this.ordersSum = 0;
    };

    return Box;
});