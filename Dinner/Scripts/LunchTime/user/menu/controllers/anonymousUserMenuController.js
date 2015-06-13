/**
 * anonymousUserMenuController.
 * @file anonymousUserMenuController.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['underscore', 'framework/class', 'framework/assert', 'framework/utils'], function (_, Class, assert, utils) {
    'use strict';

    var anonymousUserMenuController = ['$scope', 'menuData',
        /**
         * Anonymous user menu controller.
         * @param {object} $scope - Controller scope service.
         * @param {object} menuData - Menu data.  
         * @constructor
         */
        Class.create(function ($scope, menuData) {
            this.$scope = utils.extend($scope, angular.copy(this.$scope), true);

            this.initialize(menuData);
        }, {
            $scope: {
                date: null,
                courses: []
            },

            /** 
             * Initialize controller. 
             * @param {object} menuData - Menu data.
             */
            initialize: function (menuData) {
                assert.isNotNull(menuData, 'menuData');

                this.$scope.date = menuData.date;
                this.$scope.courses = menuData.courses;
            }
        })];

    return anonymousUserMenuController;
});