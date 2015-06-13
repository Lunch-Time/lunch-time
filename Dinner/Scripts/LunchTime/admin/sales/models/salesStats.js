/**
 * salesStats.
 * @file salesStats.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['framework/assert'], function (assert) {
    'use strict';

    /**
     * Sales stats.
     * @param {number} ordersPurchased - Orders purchased count.
     * @param {number} totalOrders - Total orders count.
     * @constructor
     */
    var SalesStats = function (ordersPurchased, totalOrders) {
        assert.isNumber(ordersPurchased, 'ordersPurchased');
        assert.isNumber(totalOrders, 'totalOrders');

        this.ordersPurchased = ordersPurchased;
        this.totalOrders = totalOrders;
    };

    return SalesStats;
});