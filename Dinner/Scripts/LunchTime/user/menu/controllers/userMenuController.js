/**
 * userMenuController.
 * @file userMenuController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'framework/class', 'framework/assert', 'framework/utils', 'toastr'], function (_, Class, assert, utils, toastr) {
    'use strict';

    var userMenuController = ['$scope', 'userMenuApiService', 'orderService', 'menuData',
        /**
         * User menu controller.
         * @param {object} $scope - Controller scope service.
         * @param {object} userMenuApiService - User menu API service.
         * @param {object} orderService - Order service.
         * @param {object} menuData - Menu data.         
         * @constructor
         */
        Class.create(function($scope, userMenuApiService, orderService, menuData) {
            this.$scope = utils.extend($scope, angular.copy(this.$scope), true);

            this.userMenuApiService = userMenuApiService;
            this.orderService = orderService;

            this.initialize(menuData);
        }, {
            $scope: {
                date: null,
                isFreezed: null,
                freezeTime: null,
                courses: [],
                orders: [],
                wishedCourses: []
            },

            /** User menu API service. */
            userMenuApiService: null,

            /** Order service. */
            orderService: null,

            /** 
             * Initialize controller. 
             * @param {object} menuData - Menu data.
             */
            initialize: function (menuData) {
                assert.isNotNull(menuData, 'menuData');

                this.$scope.date = menuData.date;
                this.$scope.isFreezed = menuData.isFreezed;
                this.$scope.freezeTime = menuData.freezeTime;
                this.$scope.courses = menuData.courses;
                this.$scope.orders = menuData.orders;
                this.$scope.wishedCourses = menuData.wishedCourses;
                
                this.$scope.orderCourse = _.bind(this.orderCourse, this);
                this.$scope.removeOrder = _.bind(this.removeOrder, this);
                this.$scope.moveOrderToBox = _.bind(this.moveOrderToBox, this);
            },

            /** 
             * Order course.
             * @param {object} course - Course.
             * @param {number} quantity - Quantity.
             */
            orderCourse: function (course, quantity) {
                assert.isNotNull(course, 'course');
                assert.isNotNull(quantity, 'quantity');

                var promise = this.userMenuApiService.orderCourse(course, quantity, this.$scope.date);

                promise.then(
                    _.bind(function(order) {
                        this.$scope.orders = this.orderService.addNewOrderToCollection(this.$scope.orders, order);
                        course.ordersCount += quantity;
                    }, this),
                    _.bind(this._onFail, this));

                return promise;
            },


            /** 
             * Remove order.
             * @param {object} order - Order.
             */
            removeOrder: function (order) {
                assert.isNotNull(order, 'order');

                var promise = this.userMenuApiService.removeOrder(order, this.$scope.date);

                promise.then(
                    _.bind(function() {
                        this.$scope.orders = this.orderService.removeOrderFromCollection(this.$scope.orders, order);
                        order.course.ordersCount -= order.quantity;
                    }, this),
                    _.bind(this._onFail, this));

                return promise;
            },


            /** 
             * Move order to box.
             * @param {object} order - Order.
             * @param {object} box - Box.
             */
            moveOrderToBox: function (order, box) {
                assert.isNotNull(order, 'order');
                assert.isNotNull(box, 'box');

                var promise = this.userMenuApiService.moveOrderToBox(order, box, this.$scope.date);

                promise.then(
                    _.bind(function(movedOrder) {
                        var updatedOrders = this.orderService.removeOrderFromCollection(this.$scope.orders, order);
                        updatedOrders = this.orderService.addNewOrderToCollection(updatedOrders, movedOrder);

                        this.$scope.orders = updatedOrders;
                    }, this),
                    _.bind(this._onFail, this));

                return promise;
            },


            /** 
             * On operation failed.
             * @param {string} errorMessage - Error message.
             */
            _onFail: function(errorMessage) {
                toastr.error(errorMessage);
                //this.userMenuApiService.getCoursesAndOrders(this.$scope.date).then(_.bind(this.initialize, this));
            }
        })];

    return userMenuController;
});