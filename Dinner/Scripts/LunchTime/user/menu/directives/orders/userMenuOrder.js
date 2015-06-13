/**
 * userMenuOrder.
 * @file userMenuOrder.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function() {
    'use strict';

    var userMenuOrder = [function () {

        return {
            restrict: 'AE',
            templateUrl: '/template/user/menu/orders/order.tmpl',
            scope: {
                order: '=',
                isFreezed: '=',
                boxes: '=',
                onRemoveOrder: '&',
                onMoveOrderToBox: '&'
            },
            controller: 'userMenuOrderController'
        };
    }];

    return userMenuOrder;
});