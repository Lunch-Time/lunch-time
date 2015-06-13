/**
 * userOrdersController.
 * @file userOrdersController.js.
 * @copyright Copyright © Lunch-Time 2014
 */

define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var userOrdersController = [
        '$scope', 'userOrdersApiService',
        Class.create(
            /**
            * UserOrdersController
            * @param {object} $scope - Controller scope service.
            * @param {object} userOrdersApiService - User orders API service.
            * @constructor
            */
            function ($scope, userOrdersApiService) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);

                this.userOrdersApiService = userOrdersApiService;

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    fromDate: null,
                    toDate: null,
                    daysOrders: []
                },

                /** User orders API service. */
                userOrdersApiService: null,

                /** 
                * Initialize controller. 
                * @param {object} ordersData - Orders data.
                */
                initialize: function () {
                    this.userOrdersApiService.getOrders(new Date(2014, 11, 28), new Date(2015, 0, 2), {}).then(_.bind(function(ordersData) {
                        this.$scope.daysOrders = ordersData.daysOrders;
                    }, this));
                }
            })
    ];

    return userOrdersController;

});