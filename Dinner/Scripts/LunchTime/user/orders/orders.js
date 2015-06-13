/**
 * Lunch Time Template Module.
 * @file user.orders.js.
 * @copyright Copyright
 */
define(
    [
        'angular',
        'angular-infinite-scroll',
        'user/orders/controllers/controllers',
        'user/orders/services/services',
        'user/orders/filters/filters',
        'user/orders/directives/directives',
        'user/orders/templates/templates'
    ],
    function(angular, ngInfiniteScrool, controllers, services, filters, directives, templates) {
        'use strict';

        var dependencies = [
            controllers.name,
            services.name,
            filters.name,
            directives.name,
            templates.name,
            'infinite-scroll'
        ];

        var template = angular.module('lunchtime.user.orders', dependencies);

        return template;
    });