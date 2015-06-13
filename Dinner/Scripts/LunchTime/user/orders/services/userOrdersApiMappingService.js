/**
 * userOrdersApiMappingService.
 * @file userOrdersApiMappingService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(
    [
        'underscore', 'moment', 'framework/assert', 'framework/utils',
        'user/orders/models/dayOrder'
    ],
    function(_, moment, assert, utils, DayOrder) {
        'use strict';

        var userOrdersApiMappingService = [
            'commonApiMappingService',
            function(commonApiMappingService) {
                return {
                    /** 
                     * Map response to day orders.
                     * @param {array} reponse - Reponse with day orders data.
                     * @param {object} coursesMap - Courses map.
                     * @returns {array} Days orders.
                     */
                    mapResponseToDaysOrders: function(response, coursesMap) {
                        assert.isArray(response, 'response');
                        assert.isNotNull(coursesMap, 'coursesMap');

                        var daysOrders = _.map(response, function(dayOrderData) {
                            assert.isNotNull(dayOrderData, 'dayOrderData');

                            var orders = _.map(dayOrderData.Orders, function(orderData) {
                                var order = commonApiMappingService.mapResponseToOrder(orderData, coursesMap);
                                return order;
                            });

                            var date = moment(dayOrderData.Date).toDate();

                            var dayOrder = new DayOrder({
                                id: dayOrderData.OrderID,
                                date: date,
                                isFreezed: dayOrderData.IsFreezed,
                                isPurchased: dayOrderData.IsPurchased,
                                orders: orders
                            });

                            return dayOrder;
                        });

                        return daysOrders;
                    }
                };
            }
        ];

        return userOrdersApiMappingService;
    });