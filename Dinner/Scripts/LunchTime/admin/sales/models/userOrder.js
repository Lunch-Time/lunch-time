/**
 * userOrder.
 * @file userOrder.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['framework/assert'], function(assert) {
    'use strict';

    /**
     * User order.
     * @param {number} id - User order ID.
     * @param {object} user - User.
     * @param {array} orders - User orders.
     * @param {boolean} isPurchased - Is orders purchased.
     * @constructor
     */
    var UserOrder = function(id, user, orders, isPurchased) {
        assert.isNotNull(id, 'id');
        assert.isNotNull(user, 'user');
        assert.isArray(orders, 'orders');

        this.id = id;
        this.user = user;
        this.orders = orders;
        this.isPurchased = isPurchased || false;
    };

    return UserOrder;
});