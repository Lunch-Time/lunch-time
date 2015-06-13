/**
 * adminSalesController.
 * @file adminSalesController.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var adminSalesController = [
        '$scope', '$q', '$modal', 'adminSalesService', 'adminSalesApiService', 'adminSalesDateWatcherService', 'salesData',
        Class.create(
            /**
            * Admin Sales Controller
            * @param {object} $scope - Controller scope service.
            * @param {object} $q - Promise service.
            * @param {object} $modal - Modal service.
            * @param {object} adminSalesService - Admin Sales service.
            * @param {object} adminSalesApiService - Admin Sales API service.
            * @param {object} adminSalesDateWatcherService - Admin Sales date watcher service.
            * @param {object} salesData - Sales Data.
            * @constructor
            */
            function($scope, $q, $modal, adminSalesService, adminSalesApiService, adminSalesDateWatcherService, salesData) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.$q = $q;
                this.$modal = $modal;
                this.adminSalesService = adminSalesService;
                this.adminSalesApiService = adminSalesApiService;
                this.adminSalesDateWatcherService = adminSalesDateWatcherService;

                this.initialize(salesData);
            }, {
                /** Controller scope defaults. */
                $scope: {
                    date: null,
                    usersOrders: [],
                    orderedCoursesStats: []
                },

                /** Promise service. */
                $q: null,

                /** Modal service. */
                $modal: null,

                /** Admin Sales service. */
                adminSalesService: null,
                
                /** Admin Sales API service. */
                adminSalesApiService: null,       
                
                /** Admin Sales date watcher service. */
                adminSalesDateWatcherService: null,

                /** 
                * Initialize controller. 
                * @param {object} salesData - Sales Data.
                */
                initialize: function(salesData) {
                    assert.isNotNull(salesData, 'salesData');
                    assert.isNotNull(salesData.date, 'salesData.date');
                    assert.isArray(salesData.usersOrders, 'salesData.usersOrders');

                    this.$scope.date = salesData.date;
                    this.$scope.usersOrders = salesData.usersOrders;
                   
                    this.$scope.purchaseOrder = _.bind(this.purchaseOrder, this);
                    this.$scope.undoPurchaseOrder = _.bind(this.undoPurchaseOrder, this);
                    this.$scope.removeOrder = _.bind(this.removeOrder, this);

                    this.$scope.$watch('usersOrders', _.bind(this.onOrdersChanged, this), true);

                    this.$scope.$on('$destroy', _.bind(this.onDestroy, this));

                    this.adminSalesDateWatcherService.watch();
                },


                /** 
                 * Orders changed handler.
                 * @param {array} usersOrders - Users orders.
                  */
                onOrdersChanged: function(usersOrders) {
                    this.$scope.orderedCoursesStats = this.adminSalesService.getOrderedCoursesStats(usersOrders);
                },

                /** 
                 * Purchase order. 
                 * @param {object} userOrder - User order.
                 */
                purchaseOrder: function (userOrder) {
                    assert.isNotNull(userOrder, 'userOrder');

                    var promise = this.adminSalesApiService.purchaseOrder(userOrder, this.$scope.date);

                    return promise;
                },


                /** 
                 * Undo purchase order. 
                 * @param {object} userOrder - User order.
                 */
                undoPurchaseOrder: function (userOrder) {
                    assert.isNotNull(userOrder, 'userOrder');

                    var promise = this.adminSalesApiService.undoPurchaseOrder(userOrder, this.$scope.date);

                    return promise;
                },


                /** 
                 * Remove order. 
                 * @param {object} userOrder - User order.
                 */
                removeOrder: function (userOrder) {
                    assert.isNotNull(userOrder, 'userOrder');

                    var promise = this.adminSalesApiService.removeOrder(userOrder, this.$scope.date);

                    return promise;
                },

                /** Scope destroy handler. */
                onDestroy: function () {
                    this.adminSalesDateWatcherService.dispose();
                }
            })
    ];

    return adminSalesController;
});