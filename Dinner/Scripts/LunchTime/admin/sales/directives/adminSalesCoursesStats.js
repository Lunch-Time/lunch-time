/**
 * adminSalesCoursesStats.
 * @file adminSalesCoursesStats.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    var adminSalesCoursesStats = [
        function() {

            return {
                restrict: 'AE',
                templateUrl: '/template/admin/sales/courses-stats.tmpl',
                scope: {
                    date: '=',
                    coursesStats: '='
                },
                controller: 'adminSalesCoursesStatsController'
            };
        }
    ];

    return adminSalesCoursesStats;
});