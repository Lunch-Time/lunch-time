/**
 * Lunch Time User Routes.
 * @file user.routes.js.
 * @copyright Copyright ©
 */
define([], function () {
    'use strict';
    
    var userRoutes = ['$routeProvider', '$locationProvider', 'user.config',
        function ($routeProvider, $locationProvider, userConfig) {
           
            var applicationUrl = userConfig.urls.application;
            var views = userConfig.urls.views;

            $routeProvider.when(applicationUrl + '/:date?', {
                templateUrl: views.menuView,
                controller: 'userMenuController',
                resolve: {
                    menuData: ['userMenuApiService', '$route', function (userMenuApiService, $route) {

                        var date = $route.current.params.date;
                        if (!date) {
                            var today = new Date();
                            var offset = today.getDay() >= 5 ? 8 - today.getDay() : 1;
                            date = today.setDate(today.getDate() + offset);
                        }
                        
                        var promise = userMenuApiService.getCoursesAndOrders(date);
                        return promise;
                    }]
                }
            });

            $routeProvider.when(userConfig.urls.userOrders, {
                templateUrl: views.userOrdersView,
                controller: 'userOrdersController'
            });

        }];

    return userRoutes;
});