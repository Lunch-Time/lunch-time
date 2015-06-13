/**
 * dayOrder.
 * @file dayOrder.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['framework/assert'], function(assert) {
    'use strict';

    /**
     * User orders for day.
     * @param {number} id - ID.
     * @param {date} date - Date.
     * @param {boolean} isFreezed - Is freezed.
     * @param {boolean} isPurchased - Is purchased.
     * @param {array} orders - Orders.
     * @constructor
     */
    var DayOrder = function(id, date, isFreezed, isPurchased, orders) {
        if (arguments.length === 1) {
            var dayOrder = arguments[0];
            assert.isObject(dayOrder, 'dayOrder');

            return new DayOrder(dayOrder.id, dayOrder.date, dayOrder.isFreezed, dayOrder.isPurchased, dayOrder.orders);
        }

        assert.isNotNull(id, 'id');
        assert.isDate(date, 'date');
        assert.isArray(orders, 'orders');

        this.id = id;
        this.date = date;
        this.isFreezed = isFreezed;
        this.isPurchased = isPurchased;
        this.orders = orders;
    };

    return DayOrder;
});