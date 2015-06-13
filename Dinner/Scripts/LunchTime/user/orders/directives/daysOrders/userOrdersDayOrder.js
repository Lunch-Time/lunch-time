/**
 * userOrdersDayOrder.
 * @file userOrdersDayOrder.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    var userOrdersDayOrder = [
        function() {

            return {
                restrict: 'AE',
                templateUrl: '/template/user/orders/days/day/order.tmpl',
                scope: {
                    order: '=',
                    isFreezed: '='
                },
                controller: 'userOrdersDayOrderController'
            };
        }
    ];

    return userOrdersDayOrder;
});