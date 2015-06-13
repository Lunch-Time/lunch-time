/**
 * ordersMenuCourseChangeMaxOrdersController.
 * @file ordersMenuCourseChangeMaxOrdersController.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var ordersMenuCourseChangeMaxOrdersController = [
        '$scope', '$modalInstance', 'course', 'onSaveChanges',
        Class.create(
            /**
            * orders change course max orders controller.
            * @param {object} $scope - Controller scope service.
            * @param {object} $modalInstance - Current modal dialog instance.
            * @param {object} course - Course.
            * @param {function} onSaveChanges - On save changes callback.
            * @constructor
            */
            function ($scope, $modalInstance, course, onSaveChanges) {
                this.$scope = utils.extend($scope, this.$scope, true);
                this.$modalInstance = $modalInstance;

                this.initialize(course, onSaveChanges);
            }, {
                /** Controller scope defaults. */
                $scope: {
                    course: null,
                    state: {
                        isSavingChanges: null
                    }
                },

                /** Current modal dialog instance */
                $modalInstance: null,

                /** Course */
                course: null,

                /**  On save changes callback. */
                onSaveChanges: null,
                

                /** 
                * Initialize controller. 
                * @param {object} course - Course.
                * @param {function} onSaveChanges - On save changes callback.
                */
                initialize: function (course, onSaveChanges) {
                    assert.isNotNull(course, 'course');
                    assert.isNotNull(onSaveChanges, 'onSaveChanges');

                    this.course = course;
                    this.onSaveChanges = onSaveChanges;

                    this.$scope.course = angular.copy(course);
                    this.$scope.state = {
                        isSavingChanges: null
                    };

                    this.$scope.saveChanges = _.bind(this.saveChanges, this);
                    this.$scope.closeDialog = _.bind(this.closeDialog, this);
                },

                /** Save changes. */
                saveChanges: function() {
                    assert.isNumber(this.$scope.course.maxOrders, 'maxOrders');
                    assert.isTrue(this.$scope.course.maxOrders > 0, 'maxOrders');

                    var maxOrders = this.$scope.course.maxOrders;

                    this.$scope.state.isSavingChanges = true;

                    this.onSaveChanges(maxOrders)
                        .then(_.bind(function() {
                            this.$modalInstance.close();
                        }, this))
                        .finally(_.bind(function() {
                            this.$scope.state.isSavingChanges = false;
                        }, this));
                },

                /** Discard changes and close dialog */
                closeDialog: function() {
                    this.$modalInstance.dismiss();
                }
            })
    ];

    return ordersMenuCourseChangeMaxOrdersController;
});