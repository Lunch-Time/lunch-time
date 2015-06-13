/**
 * userMenuService.
 * @file userMenuService.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'framework/assert', 'user/menu/models/orderOption'], function (_, assert, OrderOption) {
    'use strict';

    var userMenuService = ['categoryService',
        function (categoryService) {
            
            return {
                getDefaultOrderOptionForCourse: function(course) {
                    var portionsLeft = course.maxOrders - course.ordersCount;
                    var defaultOption = portionsLeft === 0.5
                        ? new OrderOption(0.5, '1/2')
                        : new OrderOption(1, '');

                    return defaultOption;
                },
                
                getOrderOptionsForCourse: function (course) {
                    var options = [];

                    var portionsLeft = course.maxOrders - course.ordersCount;

                    if (portionsLeft === 0)
                        return options;

                    var isHalfPortionsAllowed = categoryService.isHalfPortionsAllowed(course.category);
                    if (isHalfPortionsAllowed && portionsLeft >= 0.5) {
                        options.push(new OrderOption(0.5, '1/2'));
                    }

                    if (portionsLeft >= 2)
                        options.push(new OrderOption(2, '2'));

                    return options;
                }
            };
        }];

    return userMenuService;
});