/**
 * directives.
 * @file directives.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'user/orders/directives/daysOrders/userOrdersDays',
        'user/orders/directives/daysOrders/userOrdersDay',
        'user/orders/directives/daysOrders/userOrdersDayOrder'
    ],
    function (angular, userOrdersDays, userOrdersDay, userOrdersDayOrder) {
        'use strict';

        var dependencies = [];
        var directives = angular.module('lunchtime.user.orders.directives', dependencies);
        directives.directive('ltUserOrdersDays', userOrdersDays);
        directives.directive('ltUserOrdersDay', userOrdersDay);
        directives.directive('ltUserOrdersDayOrder', userOrdersDayOrder);

        return directives;
    });