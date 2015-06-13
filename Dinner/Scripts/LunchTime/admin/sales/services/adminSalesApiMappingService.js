/**
 * adminSalesApiMappingService.
 * @file adminSalesApiMappingService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(
    [
        'underscore',
        'moment',
        'framework/assert',
        'common/models/user',
        'common/models/order',
        'admin/sales/models/userOrder',
        'admin/sales/models/salesData'
    ],
    function (_, moment, assert, User, Order, UserOrder, SalesData) {
        'use strict';

        var adminSalesApiMappingService = [
            'commonApiMappingService',
            function(commonApiMappingService) {
                return {

                    /** 
                     * Map response to sales data. 
                     * @param {object} response - Response with users orders.
                     * @returns {object} Sales data.
                     */
                    mapResponseToSalesData: function (response) {
                        assert.isNotNull(response, 'response');
                        assert.isNotNull(response.Date, 'response.Date');
                        assert.isArray(response.UsersOrders, 'response.UsersOrders');
                       
                        var date = moment(response.Date).toDate();

                        var coursesMap = {};
                        var usersOrders = _.map(response.UsersOrders, function(usersOrdersData) {
                            return this.mapResponseToUserOrder(usersOrdersData, coursesMap);
                        }, this);

                        var salesData = new SalesData(date, usersOrders);

                        return salesData;
                    },


                    /** 
                     * Map response to user order.
                     * @param {object} response - Response with user order data.
                     * @param {object} coursesMap - Courses map.
                     * @returns {object} User order.
                     */
                    mapResponseToUserOrder: function (response, coursesMap) {
                        assert.isNotNull(response, 'response');
                        assert.isNotNull(response.OrderID, 'response.OrderID');
                        assert.isNotNull(response.UserID, 'response.UserID');
                        assert.isNotNull(response.UserName, 'response.UserName');
                        assert.isArray(response.Orders, 'response.Orders');

                        var userOrderId = response.OrderID;
                        var user = new User(response.UserID, response.UserName, response.UserIdentityNumber || '');
                        var isPurchased = response.IsPurchased || false;

                        var orders = _.map(response.Orders, function (orderData) {
                            assert.isNotNull(orderData, 'orderData');
                            assert.isNotNull(orderData.Course, 'orderData.Course');

                            var course = coursesMap[orderData.Course.ID];
                            if (!course) {
                                course = commonApiMappingService.mapResponseToCourse(orderData.Course);
                                coursesMap[course.id] = course;
                            }
                            assert.isNotNull(course, 'course');

                            var order = new Order(
                                orderData.Course.OrderItemID,
                                course,
                                orderData.Quantity,
                                orderData.Course.Boxindex
                            );

                            return order;
                        });

                        var userOrder = new UserOrder(userOrderId, user, orders, isPurchased);

                        return userOrder;
                    }

                };
            }
        ];

        return adminSalesApiMappingService;
    });