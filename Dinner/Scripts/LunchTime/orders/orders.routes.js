/**
 * Lunch Time orders Routes.
 * @file orders.routes.js.
 * @copyright Copyright ©
 */
define([], function () {
    'use strict';
    
    var userRoutes = ['$routeProvider', '$locationProvider', 'orders.config',
        function ($routeProvider, $locationProvider, ordersConfig) {
           
            var applicationUrl = ordersConfig.urls.application;
            var views = ordersConfig.urls.views;

            $routeProvider.when(applicationUrl, {
                templateUrl: views.menuView,
                controller: 'ordersManageMenuController',
                resolve: {
                    menuData: ['ordersMenuApiService', '$route', function (ordersMenuApiService, $route) {

                        var date = $route.current.params.date;

                        if (!date) {
                            var today = new Date();
                            var offset = today.getDay() >= 5 ? 8 - today.getDay() : 1;
                            date = today.setDate(today.getDate() + offset);
                        }
                        
                        var promise = ordersMenuApiService.getMenuAndCourses(date);

                        return promise;
                    }]
                }
            });

        }];

    return userRoutes;
});