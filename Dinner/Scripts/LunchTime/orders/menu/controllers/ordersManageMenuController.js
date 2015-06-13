/**
 * ordersManageMenuController.
 * @file ordersManageMenuController.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define(['underscore', 'framework/class', 'framework/assert', 'framework/utils', 'toastr'], function (_, Class, assert, utils, toastr) {
    'use strict';

    var ordersManageMenuController = [
        '$scope', '$q', '$modal', 'config', 'ordersMenuApiService', 'ordersMenuData',
        Class.create(
            /**
            * orders Menu Controller
            * @param {object} $scope - Controller scope service.
            * @param {object} $q - Promise service.
            * @param {object} $modal - Modal service.
            * @param {object} config - Application config.
            * @param {object} ordersMenuApiService - orders Menu API service.
            * @param {object} menuData - Menu Data.
            * @constructor
            */
            function ($scope, $q, $modal, config, ordersMenuApiService, ordersMenuData) {
                this.$scope = utils.extend($scope, this.$scope, true);
                this.$q = $q;
                this.$modal = $modal;
                this.config = config;
                this.ordersMenuApiService = ordersMenuApiService;

                this.initialize(ordersMenuData);
            }, {
                /** Controller scope defaults. */
                $scope: {
                    date: null,
                    menuCourses: [],
                    availableCourses: []
                },

                /** Promise service. */
                $q: null,     
                
                /** Modal service. */
                $modal: null,

                /** Application config. */
                config: null,

                /** orders Menu API service. */
                ordersMenuApiService: null,
                
                /** 
                * Initialize controller. 
                * @param {object} menuData - Menu Data.
                */
                initialize: function (ordersMenuData) {
                    assert.isNotNull(ordersMenuData, 'ordersMenuData');

                },

                
            })
    ];

    return ordersManageMenuController;
});