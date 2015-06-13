/**
 * orderService.
 * @file orderService.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([
    'underscore', 'framework/assert', 'framework/utils',
    'user/menu/models/box', 'user/menu/models/orderedBoxes'
],
function (_, assert, utils, Box, OrderedBoxes) {
    'use strict';

    var orderService = ['user.config', function (userConfig) {

        return {
            /** 
             * Group orders by boxes.
             * @param {array} orders - Orders.
             * @returns {object} Ordered boxes.
             */
            groupOrdersByBoxes: function (orders) {
                assert.isArray(orders, 'orders');

                var boxes = _.chain(orders)
                    .groupBy(function(order) {
                        return order.box;
                    })
                    .pairs()
                    .map(function(boxOrdersPair) {
                        var boxIndex = parseInt(boxOrdersPair[0], 10);
                        var boxOrders = _.chain(boxOrdersPair[1])
                            .sortBy(function(order) {
                                return order.course.name;
                            })
                            .sortBy(function(order) {
                                return order.course.category.id;
                            })
                            .value();

                        return new Box(boxIndex, boxOrders);
                    })
                    .value();

                if (boxes.length === 0) {
                    boxes.push(new Box(0, []));
                }

                var orderedBoxes = new OrderedBoxes(boxes);
                this.calculateOrdersSum(orderedBoxes);

                return orderedBoxes;
            },

            /** 
             * Add new order to orders collection and update quantities.
             * @param {array} orders - Orders.
             * @param {object} newOrder - New order.
             * @returns {array} Updated orders collection.
              */
            addNewOrderToCollection: function(orders, newOrder) {
                assert.isArray(orders, 'orders');
                assert.isNotNull(newOrder, 'newOrder');

                var existingOrder = _.find(orders, function(order) {
                    return order.id === newOrder.id;
                });

                if (existingOrder) {
                    existingOrder.quantity += newOrder.quantity;
                } else {
                    orders.push(newOrder);
                }

                return orders;
            },


            /** 
             * Remove order from collection.
             * @param {array} orders - Orders.
             * @param {object} removedOrder - Removed order.
             * @returns {array} Updated orders collection.
              */
            removeOrderFromCollection: function (orders, removedOrder) {
                assert.isArray(orders, 'orders');
                assert.isNotNull(removedOrder, 'removedOrder');

                return _.without(orders, removedOrder);
            },


            /** 
             * Generate new box index.
             * @param {array} boxes - Boxes.
             * @returns {number} New box index.
             */
            getNewBoxIndex: function (boxes) {
                assert.isArray(boxes, 'boxes');

                var newBoxIndex = 1;
                var boxIndexes = _.map(boxes, function(box) {
                    return box.index;
                });

                while (newBoxIndex < userConfig.restrictions.maxBoxCount) {
                    var isBoxExists = _.contains(boxIndexes, newBoxIndex);
                    if (!isBoxExists) {
                        return newBoxIndex;
                    } else {
                        newBoxIndex++;
                    }
                }

                throw new Error('Вы не можете заказать больше {0} боксов.'.format(userConfig.restrictions.maxBoxCount));
            },


            /** 
             * Calculate orders summary price.
             * @param {array} orderedBoxes - Ordered boxes.
             * @returns {number} Summary price.
             */
            calculateOrdersSum: function (orderedBoxes) {
                assert.isNotNull(orderedBoxes, 'orderedBoxes');

                var ordersSum = 0;
                _.each(orderedBoxes.boxes, function(box) {
                    var boxOrdersSum = 0;
                    _.each(box.orders, function(order) {
                        var orderSum = order.course.price * order.quantity;
                        boxOrdersSum += orderSum;
                    });

                    box.ordersSum = boxOrdersSum;
                    ordersSum += boxOrdersSum;
                });

                orderedBoxes.ordersSum = ordersSum;
            },


            /** 
             * Check if course could be moved to box.
             * @param {object} course - Course.
             * @returns {boolean} Is course can be moved to the box.
             */
            checkCourseBoxingAllowed: function(course) {
                assert.isNotNull(course, 'course');

                var isBoxingAllowed = _.contains(userConfig.restrictions.boxingAllowedCategories, course.category.id);

                return isBoxingAllowed;
            }
        };
    }];

    return orderService;
});