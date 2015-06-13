/**
 * admin module.
 * @file admin.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(
    [
        'angular',
        'common/common',
        'admin/admin.config',
        'admin/admin.routes',
        'admin/admin.events',
        'admin/menu/menu',
        'admin/sales/sales'
    ],
    function(angular, common, adminConfig, adminRoutes, adminEvents, menuModule, salesModule) {
        'use strict';

        var dependencies = [
            common.name,
            menuModule.name,
            salesModule.name
        ];

        var adminModule = angular.module('lunchtime.admin', dependencies);
        adminModule.constant('admin.config', adminConfig);
        adminModule.constant('admin.events', adminEvents);
        adminModule.config(adminRoutes);

        return adminModule;
    });