/**
 * Order.
 * @file order.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function (assert) {
    'use strict';

    /** 
    * Order.
    * @param {number} id - Order ID.
    * @param {object} course - Ordered course.
    * @param {number} quantity - Ordered course quantity.
    * @param {number} box - Order box index.
    */
    var Order = function (id, course, quantity, box) {
        assert.isNotNull(id, 'id');
        assert.isNotNull(course, 'course');
        assert.isNotNull(quantity, 'quantity');
        assert.isNumber(quantity, 'quantity');
        assert.isNotNull(box, 'box');
        assert.isNumber(box, 'box');

        this.id = id;
        this.course = course;
        this.quantity = quantity;
        this.box = box;
    };

    return Order;
});