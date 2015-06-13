/**
 * userOrdersDayController.
 * @file userOrdersDayController.js.
 * @copyright Copyright © Lunch-Time 2014
 */

define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var userOrdersDayController = [
        '$scope', 'orderService',
        Class.create(
            /**
            * UserOrdersDayController
            * @param {object} $scope - Controller scope service.
            * @param {object} orderService - Order service.
            * @constructor
            */
            function ($scope, orderService) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.orderService = orderService;

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    dayOrders: null,
                    orderedBoxes: [],
                    state: {
                        isArchived: false,
                        isCurrentDate: true,
                        hasOrders: true
                    },
                    courseImage: {
                        thumbnailUrl: null,
                        url: null
                    }
                },

                /** Order service. */
                orderService: null,

                /** 
                * Initialize controller. 
                */
                initialize: function() {
                    this.$scope.$watch('dayOrders.orders', _.bind(this._updateOrders, this), true);

                    this.$scope.boxClass = _.bind(this.boxClass, this);
                    
                },

                boxClass: function(box) {
                    return box.index > 0 ? 'box{0}'.format(box.index) : '';
                },

                /** Update ordered boxes. */
                _updateOrders: function (orders) {
                    this.$scope.orderedBoxes = this.orderService.groupOrdersByBoxes(orders);
                }
            })
    ];

    return userOrdersDayController;
});