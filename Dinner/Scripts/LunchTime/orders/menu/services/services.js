/**
 * services.
 * @file services.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'orders/menu/services/ordersMenuApiService',
        'orders/menu/services/ordersMenuApiMappingService'
    ],
    function (angular, ordersMenuApiService, ordersMenuApiMappingService) {
        'use strict';

        var dependencies = [];
        var services = angular.module('lunchtime.orders.menu.services', dependencies);

        services.service('ordersMenuApiService', ordersMenuApiService);
        services.service('ordersMenuApiMappingService', ordersMenuApiMappingService);

        return services;
    });