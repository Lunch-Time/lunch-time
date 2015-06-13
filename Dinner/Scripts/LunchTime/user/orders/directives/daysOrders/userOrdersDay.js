/**
 * userOrdersDay.
 * @file userOrdersDay.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    var userOrdersDay = [
        function() {

            return {
                restrict: 'AE',
                templateUrl: '/template/user/orders/days/day.tmpl',
                replace: true,
                scope: {
                    dayOrders: '='
                },
                controller: 'userOrdersDayController'
            };
        }
    ];

    return userOrdersDay;
});