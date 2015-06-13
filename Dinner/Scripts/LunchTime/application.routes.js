/**
 * Lunch Time Application Routes.
 * @file application.routes.js.
 * @copyright Copyright ©
 */
define([], function () {
    'use strict';
    
    var applicationRoutes = ['$routeProvider', '$locationProvider', 'config',
        function ($routeProvider, $locationProvider, config) {
           
            var applicationUrl = config.urls.application;

            $routeProvider.otherwise({ redirectTo: applicationUrl });

            $locationProvider.html5Mode(true);
        }];

    return applicationRoutes;
});