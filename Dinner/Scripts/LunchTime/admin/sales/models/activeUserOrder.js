/**
 * activeUserOrder.
 * @file activeUserOrder.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    /**
     * Active user order.
     * @param {object} userOrder - User order.
     * @param {boolean} isActivatedByIdentityCard - Is activated by identity card.
     * @constructor
     */
    var ActiveUserOrder = function (userOrder, isActivatedByIdentityCard) {
        this.userOrder = userOrder;
        this.isActivatedByIdentityCard = isActivatedByIdentityCard;
    };

    return ActiveUserOrder;
});