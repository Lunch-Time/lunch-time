/**
 * Lunch Time Common Module.
 * @file common.js.
 * @copyright Copyright
 */
define(['angular',
        'common/controllers/controllers',
        'common/services/services',
        'common/filters/filters',
        'common/directives/directives',
        'common/providers/providers',
        'common/templates/templates'],
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

        var template = angular.module('lunchtime.common', dependencies);

        return template;
    });