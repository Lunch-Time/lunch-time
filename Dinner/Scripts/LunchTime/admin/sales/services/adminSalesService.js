/**
 * adminSalesService.
 * @file adminSalesService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(
    [
        'underscore',
        'framework/assert',
        'framework/utils',
        'admin/sales/models/orderedCourseStats',
        'admin/sales/models/salesStats'
    ],
    function (_, assert, utils, OrderedCourseStats, SalesStats) {
        'use strict';

        var adminSalesService = [
            function() {

                return {

                    /** 
                     * Get ordered courses stats.
                     * @param {array} usersOrders - Users orders.
                     * @returns {array} Ordered courses stats.
                     */
                    getOrderedCoursesStats: function(usersOrders) {
                        assert.isArray(usersOrders, 'usersOrders');

                        var orderedCoursesStatsMap = {};

                        _.each(usersOrders, function(userOrder) {
                            _.each(userOrder.orders, function(order) {
                                var course = order.course;

                                var orderedCourseStat = orderedCoursesStatsMap[course.id];
                                if (!orderedCourseStat) {
                                    orderedCourseStat = new OrderedCourseStats(course, 0, 0);
                                    orderedCoursesStatsMap[course.id] = orderedCourseStat;
                                }

                                orderedCourseStat.totalOrders += order.quantity;
                                if (!userOrder.isPurchased) {
                                    orderedCourseStat.ordersLeft += order.quantity;
                                }
                            });
                        });

                        var orderedCoursesStats = _.values(orderedCoursesStatsMap);

                        return orderedCoursesStats;
                    },

                    /** 
                     * Get sales stats.
                     * @param {array} usersOrders - Users orders.
                     * @returns {object} Sales stats.
                     */
                    getSalesStats: function(usersOrders) {
                        assert.isArray(usersOrders, 'usersOrders');

                        var ordersPurchased = 0;
                        var totalOrders = usersOrders.length;

                        _.each(usersOrders, function(userOrder) {
                            if (userOrder.isPurchased) {
                                ordersPurchased++;
                            }
                        });

                        var salesStats = new SalesStats(ordersPurchased, totalOrders);

                        return salesStats;
                    },


                    /** 
                     * Get purchased users orders.
                     * @param {array} usersOrders - Users orders.
                     * @returns {array} Purchased users orders.
                     */
                    getPurchasedUsersOrders: function(usersOrders) {
                        assert.isArray(usersOrders, 'usersOrders');

                        var purchasedUsersOrders = _.filter(usersOrders, function(userOrder) {
                            return userOrder.isPurchased;
                        });

                        return purchasedUsersOrders;
                    },

                    /** 
                     * Get not purchased users orders.
                     * @param {array} usersOrders - Users orders.
                     * @returns {array} Not purchased users orders.
                     */
                    getNotPurchasedUsersOrders: function(usersOrders) {
                        assert.isArray(usersOrders, 'usersOrders');

                        var notPurchasedUsersOrders = _.filter(usersOrders, function(userOrder) {
                            return !userOrder.isPurchased;
                        });

                        return notPurchasedUsersOrders;
                    },


                    /** 
                     * Get user order by identity number.
                     * @param {array} usersOrders - Users orders.
                     * @param {string} identityNumber - User identity number.
                     * @returns {string} User with specified identity number.
                     */
                    getUserOrderByIdentityNumber: function(usersOrders, identityNumber) {
                        assert.isArray(usersOrders, 'usersOrders');
                        assert.isNotNull(identityNumber, 'identityNumber');

                        var matchedUserOrder = _.find(usersOrders, function(userOrder) {
                            return utils.string.equalsIgnoreCase(userOrder.user.identityNumber, identityNumber);
                        });

                        return matchedUserOrder;
                    },


                    /** 
                     * Convert value to identity number.
                     * @param {string} value - Value.
                     * @returns {string} Identity number hex value (10 symbols).
                      */
                    convertToIdentityNumber: function(value) {
                        var hexValue = Number(value).toString(16);

                        for (var index = hexValue.length; index < 10; index++) {
                            hexValue = '0' + hexValue;
                        }

                        return hexValue;
                    }
                };
            }
        ];

        return adminSalesService;
    });