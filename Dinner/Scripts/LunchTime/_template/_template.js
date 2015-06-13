/**
 * Lunch Time Template Module.
 * @file _template.js.
 * @copyright Copyright
 */
define(
    [
        'angular',
        '_template/controllers/controllers',
        '_template/services/services',
        '_template/filters/filters',
        '_template/directives/directives',
        '_template/templates/templates'
    ],
    function(angular, controllers, services, filters, directives, templates) {
        'use strict';

        var dependencies = [
            controllers.name,
            services.name,
            filters.name,
            directives.name,
            templates.name
        ];

        var template = angular.module('lunchtime._template', dependencies);

        return template;
    });