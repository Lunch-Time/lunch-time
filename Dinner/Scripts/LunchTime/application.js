/**
 * Lunch Time Application.
 * @file application.js.
 * @copyright Copyright
 */
define(
    [
        'angular',
        'application.config',
        'application.routes',
        'application.providers',
        'application.start',
        'angular-route',
        'angular-sanitize',
        'angular-bootstrap',
        'core/core',
        'common/common',
        'user/user',
        'admin/admin'
    ],
    function(angular, config, routes, providers, startHandler, ngRoute, ngSanitize, uiBootstrap, coreModule, commonModule, userModule, adminModule) {
        'use strict';

        var dependencies = [
            'ngRoute',
            'ngSanitize',
            'ui.bootstrap',
            coreModule.name,
            commonModule.name,
            userModule.name,
            adminModule.name
        ];

        var lunchtimeApplication = angular.module('lunchtime.application', dependencies);
        lunchtimeApplication.constant('config', config);

        lunchtimeApplication.config(routes);
        //lunchtimeApplication.config(providers);

        lunchtimeApplication.run(startHandler.initializeMomentLang);


        return lunchtimeApplication;
    });