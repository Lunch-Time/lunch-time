/**
 * confirmController.
 * @file confirmController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'framework/class', 'framework/assert', 'framework/utils'], function (_, Class, assert, utils) {
    'use strict';

    var confirmController = [
        '$scope', '$modalInstance', 'data',
        Class.create(
            /**
            * ConfirmController
            * @param {object} $scope - Controller scope service.
            * @param {object} $modalInstance - Current modal dialog instance.
            * @param {object} data - Current data.
            * @constructor
            */
            function($scope, $modalInstance, data) {
                this.$scope = utils.extend($scope, this.$scope, true);
                this.$modalInstance = $modalInstance;

                this.initialize(data);
            }, {
                /** Controller scope defaults. */
                $scope: {
                    data: null
                },

                /** Current modal dialog instance */
                $modalInstance: null,

                /** 
                * Initialize controller. 
                * @param {object} data - Current data.
                */
                initialize: function(data) {
                    this.$scope.data = data;

                    this.$scope.confirm = _.bind(this.confirm, this);
                    this.$scope.closeDialog = _.bind(this.closeDialog, this);
                },

                /** Confirm changes and close dialog. */
                confirm: function() {
                    this.$modalInstance.close();
                },

                /** Discard changes and close dialog */
                closeDialog: function() {
                    this.$modalInstance.dismiss();
                }
            })
    ];

    return confirmController;
});