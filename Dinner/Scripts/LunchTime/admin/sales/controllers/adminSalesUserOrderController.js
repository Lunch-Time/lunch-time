/**
 * adminSalesUserOrderController.
 * @file adminSalesUserOrderController.js.
 * @copyright Copyright © Lunch-Time 2014
 */

define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var adminSalesUserOrderController = [
        '$scope', 'orderService',
        Class.create(
            /**
            * Admin sales user order controller.
            * @param {object} $scope - Controller scope service.
            * @param {object} orderService - Order service.
            * @constructor
            */
            function($scope, orderService) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);

                this.orderService = orderService;

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    activeUserOrder: null,
                    userOrder: null,
                    isActivatedByIdentityCard: false,
                    orderedBoxes: null,
                    state: {
                        isUpdating: false
                    }
                },

                /** Order service. */
                orderService: null,


                /** 
                * Initialize controller. 
                */
                initialize: function() {
                    this.$scope.purchaseOrder = _.bind(this.purchaseOrder, this);
                    this.$scope.undoPurchaseOrder = _.bind(this.undoPurchaseOrder, this);

                    this.$scope.close = _.bind(this.close, this);

                    this.$scope.$watch('activeUserOrder', _.bind(this.onActiveUserOrderChanged, this));
                },


                /** 
                 * Active user order changed handler.
                 * @param {array} activeUserOrder - Active user order.
                 */
                onActiveUserOrderChanged: function (activeUserOrder) {
                    if (!activeUserOrder) {
                        this.close();
                        return;
                    }

                    this.$scope.userOrder = activeUserOrder.userOrder;
                    this.$scope.isActivatedByIdentityCard = activeUserOrder.isActivatedByIdentityCard;

                    this.$scope.orderedBoxes = this.orderService.groupOrdersByBoxes(this.$scope.userOrder.orders);
                },


                /** Purchase order. */
                purchaseOrder: function() {
                    this.$scope.state.isUpdating = true;

                    var userOrder = this.$scope.userOrder;

                    var promise = this.$scope.onPurchaseOrder({ userOrder: userOrder });

                    promise.then(_.bind(function() {
                        this.$scope.onClose();
                    }, this));

                    promise.finally(_.bind(function() {
                        this.$scope.state.isUpdating = false;
                    }, this));
                },


                /** Undo purchase order. */
                undoPurchaseOrder: function() {
                    this.$scope.state.isUpdating = true;

                    var userOrder = this.$scope.userOrder;

                    var promise = this.$scope.onUndoPurchaseOrder({ userOrder: userOrder });

                    promise.then(_.bind(function() {
                        this.$scope.onClose();
                    }, this));

                    promise.finally(_.bind(function() {
                        this.$scope.state.isUpdating = false;
                    }, this));
                },


                /** Close user order. */
                close: function() {
                    this.$scope.onClose();
                }
            })
    ];

    return adminSalesUserOrderController;
});