/**
 * userMenuApiService.
 * @file userMenuApiService.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(
    [
        'underscore', 'moment', 'framework/assert', 'framework/utils',
        'common/models/order'
    ],
    function(_, moment, assert, utils, Order) {
        'use strict';

        var userMenuApiService = [
            '$http', '$q', 'user.config', 'userMenuApiMappingService',
            function($http, $q, userConfig, userMenuApiMappingService) {
                var api = userConfig.urls.api;

                return {
                    /** 
                    * Get list of courses and orders for current user for specified date.
                    * @param {date} date - courses and orders date.
                    * @returns {object} promise for courses and orders.
                    */
                    getCoursesAndOrders: function(date) {
                        assert.isNotNull(date, 'date');

                        var deferred = $q.defer();

                        var options = {
                            params: {
                                date: moment(date).format('YYYY-MM-DD')
                            }
                        };

                        $http.get(api.getCoursesAndOrders, options)
                            .success(function(response) {
                                assert.isNotNull(response, 'response');

                                var menuData = userMenuApiMappingService.mapResponseToMenuData(response);
                                deferred.resolve(menuData);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },


                    /** 
                    * Get list of courses for specified date.
                    * @param {date} date - courses and orders date.
                    * @returns {object} promise for courses.
                    */
                    getCourses: function(date) {
                        assert.isNotNull(date, 'date');

                        var deferred = $q.defer();

                        var options = {
                            params: {
                                date: moment(date).format('YYYY-MM-DD')
                            }
                        };

                        $http.get(api.getCourses, options)
                            .success(function(response) {
                                assert.isNotNull(response, 'response');

                                var menuData = userMenuApiMappingService.mapResponseToAnonymousMenuData(response);
                                deferred.resolve(menuData);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },


                    /** 
                    * Order course.
                    * @param {object} course - Ordered course.
                    * @param {number} quantity - Course quantity in order.
                    * @param {date} date - Order date.
                    */
                    orderCourse: function(course, quantity, date) {
                        assert.isNotNull(course, 'course');
                        assert.isNotNull(quantity, 'quantity');
                        assert.isNotNull(date, 'date');

                        var data = {
                            courseId: course.id,
                            quantity: quantity,
                            date: moment(date).format('YYYY-MM-DD')
                        };

                        var deferred = $q.defer();

                        $http.post(api.orderCourse, data)
                            .success(function(orderId) {
                                assert.isNotNull(orderId, 'orderId');

                                orderId = parseInt(orderId, 10);
                                var order = new Order(orderId, course, quantity, 0);

                                deferred.resolve(order);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },

                    /** 
                    * Remove order.
                    * @param {object} order - Order to remove.
                    * @param {date} date - Order date.
                    */
                    removeOrder: function(order, date) {
                        assert.isNotNull(order, 'order');
                        assert.isNotNull(date, 'date');

                        var deferred = $q.defer();

                        var data = {
                            orderId: order.id,
                            date: moment(date).format('YYYY-MM-DD')
                        };

                        $http.post(api.removeOrder, data)
                            .success(function() {
                                deferred.resolve(order);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },

                    moveOrderToBox: function(order, box, date) {
                        assert.isNotNull(order, 'order');
                        assert.isNotNull(box, 'box');

                        var deferred = $q.defer();

                        var data = {
                            orderId: order.id,
                            quantity: order.quantity,
                            box: box,
                            date: moment(date).format('YYYY-MM-DD')
                        };

                        $http.post(api.moveOrderToBox, data)
                            .success(function(orderId) {
                                assert.isNotNull(orderId, 'orderId');

                                orderId = parseInt(orderId, 10);
                                var newOrder = new Order(orderId, order.course, order.quantity, box);

                                deferred.resolve(newOrder);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },


                    /** 
                     * Wish course.
                     * @param {object} course - Course.
                     * @param {date} date - Date.
                     */
                    wishCourse: function(course, date) {
                        assert.isNotNull(course, 'course');
                        assert.isNotNull(date, 'date');

                        var data = {
                            menuItemId: course.menuItemId,
                            date: moment(date).format('YYYY-MM-DD')
                        };

                        var deferred = $q.defer();

                        $http.post(api.wishCourse, data)
                            .success(function() {
                                deferred.resolve();
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },

                    
                    /** 
                     * Unwish course.
                     * @param {object} course - Course.
                     * @param {date} date - Date.
                     */
                    unwishCourse: function(course, date) {
                        assert.isNotNull(course, 'course');
                        assert.isNotNull(date, 'date');

                        var data = {
                            menuItemId: course.menuItemId,
                            date: moment(date).format('YYYY-MM-DD')
                        };

                        var deferred = $q.defer();

                        $http.post(api.unwishCourse, data)
                            .success(function() {
                                deferred.resolve();
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    }
                };
            }
        ];

        return userMenuApiService;
    });