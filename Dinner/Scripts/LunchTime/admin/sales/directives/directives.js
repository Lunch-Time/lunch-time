/**
 * directives.
 * @file directives.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'admin/sales/directives/adminSalesCoursesStats',
        'admin/sales/directives/adminSalesUsersOrders',
        'admin/sales/directives/adminSalesUserOrder'
    ],
    function (angular, adminSalesCoursesStats, adminSalesUsersOrders, adminSalesUserOrder) {
        'use strict';

        var dependencies = [];
        var directives = angular.module('lunchtime.admin.sales.directives', dependencies);
        directives.directive('ltAdminSalesCoursesStats', adminSalesCoursesStats);
        directives.directive('ltAdminSalesUsersOrders', adminSalesUsersOrders);
        directives.directive('ltAdminSalesUserOrder', adminSalesUserOrder);

        return directives;
    });