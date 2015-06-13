/**
 * userMenuOrderController.
 * @file userMenuOrderController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var userMenuOrderController = [
        '$scope', 'orderService',
        /**
         * User order controller.
         * @param {object} $scope - Controller scope service.
         * @param {object} orderService - Order service.
         * @constructor
         */
        Class.create(function($scope, orderService) {
            this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
            this.orderService = orderService;

            this.initialize();
        }, {
            $scope: {
                order: null,
                isFreezed: null,
                isBoxingAllowed: null,
                boxes: [],
                state: {
                    inMovingToBox: false,
                    isRemoving: false
                }
            },

            /** Order service. */
            orderService: null,


            /** 
             * Initialize controller. 
             */
            initialize: function () {
                this.$scope.isBoxingAllowed = this.orderService.checkCourseBoxingAllowed(this.$scope.order.course);

                this.$scope.removeOrder = _.bind(this.removeOrder, this);
                this.$scope.moveOrderToBox = _.bind(this.moveOrderToBox, this);
                this.$scope.moveOrderToNewBox = _.bind(this.moveOrderToNewBox, this);
            },


            /** 
             * Remove order.
             * @param {object} order - Order.
             */
            removeOrder: function(order) {
                assert.isNotNull(order, 'order');

                this.$scope.state.isRemoving = true;
                this.$scope.onRemoveOrder({ order: order })
                    .finally(_.bind(function () {
                    this.$scope.state.isRemoving = false;
                }, this));
            },

            /** 
             * Move order to box.
             * @param {object} order - Order.
             * @param {object} box - Box.
             */
            moveOrderToBox: function(order, box) {
                assert.isNotNull(order, 'order');
                assert.isNotNull(box, 'box');

                this.$scope.state.inMovingToBox = true;
                this.$scope.onMoveOrderToBox({ order: order, box: box })
                    .finally(_.bind(function() {
                        this.$scope.state.inMovingToBox = false;
                    }, this));
            },

            /** 
             * Move order to new box.
             * @param {object} order - Order.
             */
            moveOrderToNewBox: function(order) {
                assert.isNotNull(order, 'order');

                var box = this.orderService.getNewBoxIndex(this.$scope.boxes);

                this.moveOrderToBox(order, box);
            }
        })
    ];

    return userMenuOrderController;
});