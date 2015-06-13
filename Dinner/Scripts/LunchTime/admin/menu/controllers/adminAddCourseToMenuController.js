/**
 * adminAddCourseToMenuController.
 * @file adminAddCourseToMenuController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var adminAddCourseToMenuController = [
        '$scope', '$modalInstance', 'adminMenuApiService', 'course', 'date',
        Class.create(
            /**
            * Admin edit course max orders controller.
            * @param {object} $scope - Controller scope service.
            * @param {object} $modalInstance - Current modal dialog instance.
            * @param {object} adminMenuApiService - Admin menu API service.
            * @param {object} course - Course.
            * @param {date} date - Date.
            * @constructor
            */
            function($scope, $modalInstance, adminMenuApiService, course, date) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.$modalInstance = $modalInstance;
                this.adminMenuApiService = adminMenuApiService;

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

                /** Admin menu API service. */
                adminMenuApiService: null,

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

                    this.adminMenuApiService.addCourseToMenu(this.course, maxOrders, this.date)
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

    return adminAddCourseToMenuController;
});