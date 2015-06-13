/**
 * Lunch Time Admin sales Module.
 * @file sales.js.
 * @copyright Copyright
 */
define(
    [
        'angular',
        'admin/sales/controllers/controllers',
        'admin/sales/services/services',
        'admin/sales/filters/filters',
        'admin/sales/directives/directives',
        'admin/sales/templates/templates',
        'admin/sales/sales.start'
    ],
    function(angular, controllers, services, filters, directives, templates, startHandler) {
        'use strict';

        var dependencies = [
            controllers.name,
            services.name,
            filters.name,
            directives.name,
            templates.name
        ];

        var sales = angular.module('lunchtime.admin.sales', dependencies);
        sales.run(startHandler.initializeCardReader);

        return sales;
    });