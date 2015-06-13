/**
 * services.
 * @file services.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'user/orders/services/userOrdersApiService',
        'user/orders/services/userOrdersApiMappingService'
    ],
    function(angular, userOrdersApiService, userOrdersApiMappingService) {
        'use strict';

        var dependencies = [];
        var services = angular.module('lunchtime.user.orders.services', dependencies);
        services.service('userOrdersApiService', userOrdersApiService);
        services.service('userOrdersApiMappingService', userOrdersApiMappingService);

        return services;
    });