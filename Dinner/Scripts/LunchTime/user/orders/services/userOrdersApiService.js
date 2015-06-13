/**
 * userOrdersApiService.
 * @file userOrdersApiService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(
    [
        'underscore', 'moment', 'framework/assert', 'framework/utils',
        'user/orders/models/ordersData'
    ],
    function (_, moment, assert, utils, OrdersData) {
        'use strict';

        var userOrdersApiService = [
            '$http', '$q', 'user.config', 'userOrdersApiMappingService',
            function($http, $q, userConfig, userOrdersApiMappingService) {
                var api = userConfig.urls.api;

                return {

                    /** 
                     * Get user orders from specified date range.
                     * @param {date} fromDate - From date.
                     * @param {date} toDate - To date.
                     * @param {object} coursesMap - Courses map.
                     * @returns {object} User day orders in specified range.
                     */
                    getOrders: function (fromDate, toDate, coursesMap) {
                        assert.isDate(fromDate, 'fromDate');
                        assert.isDate(toDate, 'toDate');

                        var deferred = $q.defer();

                        var options = {
                            params: {
                                fromDate: moment(fromDate).format('YYYY-MM-DD'),
                                toDate: moment(toDate).format('YYYY-MM-DD')
                            }
                        };

                        $http.get(api.getOrders, options)
                            .success(function(response) {
                                assert.isNotNull(response, 'response');

                                var daysOrders = userOrdersApiMappingService.mapResponseToDaysOrders(response, coursesMap);

                                var ordersData = new OrdersData({
                                    fromDate: fromDate,
                                    toDate: toDate,
                                    daysOrders: daysOrders
                                });

                                deferred.resolve(ordersData);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    }
                };
            }
        ];

        return userOrdersApiService;
    });