/**
 * user module.
 * @file user.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(
    [
        'angular', 'common/common',
        'user/user.config',
        'user/user.routes',
        'user/menu/menu',
        'user/orders/orders'
    ],
    function (angular, common, userConfig, userRoutes, menuModule, ordersModule) {
        'use strict';

        var dependencies = [
            common.name,
            menuModule.name,
            ordersModule.name
        ];

        var userModule = angular.module('lunchtime.user', dependencies);
        userModule.constant('user.config', userConfig);
        userModule.config(userRoutes);

        return userModule;
    });