/**
 * userOrdersDaysController.
 * @file userOrdersDaysController.js.
 * @copyright Copyright © Lunch-Time 2014
 */

define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var userOrdersDaysController = [
        '$scope',
        Class.create(
            /**
            * UserOrdersDaysController
            * @param {object} $scope - Controller scope service.
            * @constructor
            */
            function($scope) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    activeDay: null,
                    daysOrders: null
                },

                /** 
                * Initialize controller. 
                */
                initialize: function() {

                }
            })
    ];

    return userOrdersDaysController;
});