/**
 * adminSalesUsersOrders.
 * @file adminSalesUsersOrders.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    var adminSalesUsersOrders = [
        function() {

            return {
                restrict: 'AE',
                templateUrl: '/template/admin/sales/users-orders.tmpl',
                scope: {
                    date: '=',
                    usersOrders: '=',
                    onPurchaseOrder: '&',
                    onUndoPurchaseOrder: '&',
                    onRemoveOrder: '&'
                },
                controller: 'adminSalesUsersOrdersController'
            };
        }
    ];

    return adminSalesUsersOrders;
});