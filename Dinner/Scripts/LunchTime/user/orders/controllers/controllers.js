/**
 * controllers.
 * @file controllers.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'user/orders/controllers/userOrdersController',
        'user/orders/controllers/daysOrders/userOrdersDaysController',
        'user/orders/controllers/daysOrders/userOrdersDayController',
        'user/orders/controllers/daysOrders/userOrdersDayOrderController'
    ],
    function (angular, userOrdersController, userOrdersDaysController, userOrdersDayController, userOrdersDayOrderController) {
        'use strict';

        var dependencies = [];
        var controllers = angular.module('lunchtime.user.orders.controllers', dependencies);
        controllers.controller('userOrdersController', userOrdersController);
        controllers.controller('userOrdersDaysController', userOrdersDaysController);
        controllers.controller('userOrdersDayController', userOrdersDayController);
        controllers.controller('userOrdersDayOrderController', userOrdersDayOrderController);

        return controllers;
    });