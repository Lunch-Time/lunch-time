/**
 * orderOption.
 * @file orderOption.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'framework/assert'], function (_, assert) {
    'use strict';

    /** 
    * Oreder option for course.
    * @param {number} quantity - order quantity.
    * @param {string} name - display name for option.
    */
    var OrderOption = function(quantity, name) {
        assert.isNotNull(quantity, 'quantity');

        this.quantity = quantity;
        this.name = _.isUndefined(name) ? quantity.toString() : name;
    };

    return OrderOption;
});