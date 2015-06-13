/**
 * Lunch Time Core.
 * @file core.js.
 * @copyright Copyright
 */
define(['angular',
        'core/controllers/controllers',
        'core/services/services',
        'core/filters/filters',
        'core/directives/directives',
        'core/providers/providers',
        'core/templates/templates'],
    function(angular, controllers, services, filters, directives, providers, templates) {
        'use strict';

        var modules = [
            controllers.name,
            services.name,
            filters.name,
            directives.name,
            providers.name,
            templates.name
        ];

        var core = angular.module('lunchtime.core', modules);

        return core;
    });