/**
 * Lunch Time orders Menu Module.
 * @file _template.js.
 * @copyright Copyright
 */
define(['angular',
        'orders/menu/controllers/controllers',
        'orders/menu/services/services',
        'orders/menu/filters/filters',
        'orders/menu/directives/directives',
        'orders/menu/providers/providers',
        'orders/menu/templates/templates'],
    function(angular, controllers, services, filters, directives, providers, templates) {
        'use strict';

        var dependencies = [
            controllers.name,
            services.name,
            filters.name,
            directives.name,
            providers.name,
            templates.name
        ];

        var template = angular.module('lunchtime.orders.menu', dependencies);

        return template;
    });