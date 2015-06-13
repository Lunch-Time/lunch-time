/**
 * adminSalesUserOrder.
 * @file adminSalesUserOrder.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    var adminSalesUserOrder = [
        function() {

            return {
                restrict: 'AE',
                templateUrl: '/template/admin/sales/user-order.tmpl',
                scope: {
                    activeUserOrder: '=',
                    onPurchaseOrder: '&',
                    onUndoPurchaseOrder: '&',
                    onClose: '&'
                },
                controller: 'adminSalesUserOrderController'
            };
        }
    ];

    return adminSalesUserOrder;
});