/**
 * ordersData.
 * @file ordersData.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['framework/assert'], function(assert) {
    'use strict';

    /**
     * Orders data.
     * @param {date} fromDate - From date.
     * @param {date} toDate - To date.
     * @param {array} daysOrders - Days orders.
     * @constructor
     */
    var OrdersData = function(fromDate, toDate, daysOrders) {
        if (arguments.length === 1) {
            var ordersData = arguments[0];
            assert.isObject(ordersData, 'ordersData');

            return new OrdersData(ordersData.fromDate, ordersData.toDate, ordersData.daysOrders);
        }

        assert.isDate(fromDate, 'fromDate');
        assert.isDate(toDate, 'toDate');
        assert.isArray(daysOrders, 'daysOrders');

        this.fromDate = fromDate;
        this.toDate = toDate;
        this.daysOrders = daysOrders;
    };

    return OrdersData;
});