/**
 * Lunch Time Admin Routes.
 * @file admin.routes.js.
 * @copyright Copyright ©
 */
define([], function () {
    'use strict';
    
    var userRoutes = ['$routeProvider', '$locationProvider', 'admin.config',
        function ($routeProvider, $locationProvider, adminConfig) {
           
            var applicationUrl = adminConfig.urls.application;
            var views = adminConfig.urls.views;

            $routeProvider.when(applicationUrl + '/:date?', {
                templateUrl: views.menuView,
                controller: 'adminManageMenuController',
                resolve: {
                    menuData: ['adminMenuApiService', '$route', function (adminMenuApiService, $route) {

                        var date = $route.current.params.date;

                        if (!date) {
                            var today = new Date();
                            var offset = today.getDay() >= 5 ? 8 - today.getDay() : 1;
                            date = today.setDate(today.getDate() + offset);
                        }
                        
                        var promise = adminMenuApiService.getMenuAndCourses(date);

                        return promise;
                    }]
                }
            });

            $routeProvider.when(adminConfig.urls.sales, {
                templateUrl: views.salesView,
                controller: 'adminSalesController',
                resolve: {
                    salesData: ['adminSalesApiService', function (adminSalesApiService) {
                        var date = new Date(); //new Date(2015, 0, 1);
                        var promise = adminSalesApiService.getUsersOrders(date);

                        return promise;
                    }]
                }
            });

        }];

    return userRoutes;
});