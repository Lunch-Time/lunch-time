/**
 * services.
 * @file services.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'admin/menu/services/adminMenuApiService',
        'admin/menu/services/adminMenuApiMappingService'
    ],
    function(angular, adminMenuApiService, adminMenuApiMappingService) {
        'use strict';

        var dependencies = [];
        var services = angular.module('lunchtime.admin.menu.services', dependencies);

        services.service('adminMenuApiService', adminMenuApiService);
        services.service('adminMenuApiMappingService', adminMenuApiMappingService);

        return services;
    });