/**
 * Lunch Time Menu.
 * @file menu.js.
 * @copyright Copyright
 */
define(['angular',
        'core/core',
        'common/common',
        'user/menu/controllers/controllers',
        'user/menu/services/services',
        'user/menu/filters/filters',
        'user/menu/directives/directives',
        'user/menu/providers/providers',
        'user/menu/templates/templates'],
    function(angular, core, common, controllers, services, filters, directives, providers, templates) {
        'use strict';

        var dependencies = [
            core.name,
            common.name,
            controllers.name,
            services.name,
            filters.name,
            directives.name,
            providers.name,
            templates.name
        ];

        var menu = angular.module('lunchtime.user.menu', dependencies);

        return menu;
    });