/**
 * userOrdersDays.
 * @file userOrdersDays.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    var userOrdersDays = [
        function() {

            return {
                restrict: 'AE',
                templateUrl: '/template/user/orders/days.tmpl',
                replace: true,
                scope: {
                    activeDay: '=?',
                    daysOrders: '=',
                    onRequirePreviousDaysOrders: '&',
                    onRequireNextDaysOrders: '&'
                },
                controller: 'userOrdersDaysController'
            };
        }
    ];

    return userOrdersDays;    
});