/**
 * userMenuOrdersController.
 * @file userMenuOrdersController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils', 'toastr'], function (_, angular, Class, assert, utils, toastr) {
    'use strict';

    var userMenuOrdersController = ['$scope', '$q', 'orderService', 'boxCapacityService',
        /**
         * User orders controller
         * @param {object} $scope - Controller scope service.
         * @param {object} $q - Promise service.
         * @param {object} orderService - Order service.
         * @param {object} boxCapacityService - Box capacity service.
         * @constructor
         */
        Class.create(function ($scope, $q, orderService, boxCapacityService) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.$q = $q;
                this.orderService = orderService;
                this.boxCapacityService = boxCapacityService;

                this.initialize();
            }, {
                $scope: {
                    date: null,
                    isFreezed: null,
                    orders: [],
                    orderedBoxes: {}
                },

                /** Promise service. */
                $q: null,

                /** Order service. */
                orderService: null,

                /** Box capacity service. */
                boxCapacityService: null,


                /** 
                 * Initialize controller. 
                 */
                initialize: function () {                                      
                    this.$scope.removeOrder = _.bind(this.removeOrder, this);
                    this.$scope.moveOrderToBox = _.bind(this.moveOrderToBox, this);

                    this.$scope.$watch('orders', _.bind(this._updateOrders, this), true);
                },


                /** 
                 * Remove order.
                 * @param {object} order - Order.
                 */
                removeOrder: function (order) {
                    assert.isNotNull(order, 'order');

                    return this.$scope.onRemoveOrder({ order: order });
                },
                

                /** 
                 * Move order to box.
                 * @param {object} order - Order.
                 * @param {object} box - Box.
                 */
                moveOrderToBox: function (order, box) {
                    assert.isNotNull(order, 'order');
                    assert.isNotNull(box, 'box');

                    var validationResult = this._validateBoxCapacity(order, box);
                    if (validationResult.isValid) {
                        return this.$scope.onMoveOrderToBox({ order: order, box: box });
                    } else {
                        toastr.error(validationResult.message);
                                               
                        return this.$q.rejectAsync(validationResult.message);
                    }
                },


                /** Update ordered boxes. */
                _updateOrders: function() {
                    this.$scope.orderedBoxes = this.orderService.groupOrdersByBoxes(this.$scope.orders);
                },


                /** 
                 * Validate box capacity.
                 * @param {object} order - Order.
                 * @param {number} boxIndex - Box index.
                 * @returns {boolean} Box capacity validation result.
                  */
                _validateBoxCapacity: function(order, boxIndex) {
                    var targetBox = _.find(this.$scope.orderedBoxes.boxes, function(box) {
                        return box.index === boxIndex;
                    });
                    
                    var boxOrders = targetBox ? angular.copy(targetBox.orders) : [];
                    boxOrders = this.orderService.addNewOrderToCollection(boxOrders, order);
                    var validationResult = this.boxCapacityService.checkBoxCapacity(boxOrders);

                    return validationResult;
                }
            })];

    return userMenuOrdersController;
});