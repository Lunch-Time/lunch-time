/**
 * userMenuOrders.
 * @file userMenuOrders.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function() {
    'use strict';

    var userMenuOrders = [function () {

        return {
            restrict: 'AE',
            templateUrl: '/template/user/menu/orders.tmpl',
            scope: {
                orders: '=',
                date: '=',
                isFreezed: '=',
                onRemoveOrder: '&',
                onMoveOrderToBox: '&'

            },
            controller: 'userMenuOrdersController'
        };
    }];

    return userMenuOrders;
});