/**
 * orders module.
 * @file orders.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define(
    [
        'angular',
        'common/common',
        'orders/orders.config',
        'orders/orders.routes',
        'orders/menu/menu'
    ],
    function (angular, common, ordersConfig, ordersRoutes, menu) {
        'use strict';

        var dependencies = [
            common.name,
            menu.name
        ];

        var ordersModule = angular.module('lunchtime.orders', dependencies);
        ordersModule.constant('orders.config', ordersConfig);
        ordersModule.config(ordersRoutes);

        return ordersModule;
    });