/**
 * Lunch Time Admin Menu Module.
 * @file _template.js.
 * @copyright Copyright
 */
define(
    [
        'angular',
        'admin/menu/controllers/controllers',
        'admin/menu/services/services',
        'admin/menu/filters/filters',
        'admin/menu/directives/directives',
        'admin/menu/templates/templates'
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

        var template = angular.module('lunchtime.admin.menu', dependencies);

        return template;
    });