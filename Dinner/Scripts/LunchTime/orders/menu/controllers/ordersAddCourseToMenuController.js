/**
 * ordersAddCourseToMenuController.
 * @file ordersAddCourseToMenuController.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var ordersAddCourseToMenuController = [
        '$scope', '$modalInstance', 'ordersMenuApiService', 'course', 'date',
        Class.create(
            /**
            * orders edit course max orders controller.
            * @param {object} $scope - Controller scope service.
            * @param {object} $modalInstance - Current modal dialog instance.
            * @param {object} ordersMenuApiService - orders menu API service.
            * @param {object} course - Course.
            * @param {date} date - Date.
            * @constructor
            */
            function($scope, $modalInstance, ordersMenuApiService, course, date) {
                this.$scope = utils.extend($scope, this.$scope, true);
                this.$modalInstance = $modalInstance;
                this.ordersMenuApiService = ordersMenuApiService;

                this.initialize(course, date);
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

                /** orders menu API service. */
                ordersMenuApiService: null,

                /** Course */
                course: null,

                /** Date. */
                date: null,

                /** 
                * Initialize controller. 
                * @param {object} course - Course.
                * @param {date} date - Date.
                */
                initialize: function(course, date) {
                    assert.isNotNull(course, 'course');
                    assert.isNotNull(date, 'date');

                    this.course = course;
                    this.date = date;

                    this.$scope.course = angular.copy(course);
                    this.$scope.state = {
                        isSavingChanges: null
                    };

                    this.$scope.addCourseToMenu = _.bind(this.addCourseToMenu, this);
                    this.$scope.closeDialog = _.bind(this.closeDialog, this);
                },

                /** Add course to menu. */
                addCourseToMenu: function () {
                    assert.isNumber(this.$scope.course.maxOrders, 'maxOrders');
                    assert.isTrue(this.$scope.course.maxOrders > 0, 'maxOrders');

                    var maxOrders = this.$scope.course.maxOrders;

                    this.$scope.state.isSavingChanges = true;

                    this.ordersMenuApiService.addCourseToMenu(this.course, maxOrders, this.date)
                        .then(_.bind(function(addedCourse) {
                            this.$modalInstance.close(addedCourse);
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

    return ordersAddCourseToMenuController;
});