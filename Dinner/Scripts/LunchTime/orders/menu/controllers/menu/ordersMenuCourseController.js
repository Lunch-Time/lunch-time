/**
 * ordersMenuCourseController.
 * @file ordersMenuCourseController.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define(['underscore', 'framework/class', 'framework/assert', 'framework/utils'], function(_, Class, assert, utils) {
    'use strict';

    var ordersMenuCourseController = [
        '$scope',
        Class.create(
            /**
            * orders menu course controller
            * @param {object} $scope - Controller scope service.
            * @constructor
            */
            function ($scope) {
                this.$scope = utils.extend($scope, this.$scope, true);

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    course: null,
                    date: null,
                    state: {
                        isRemoving: null
                    }
                },
                                
                /** 
                * Initialize controller. 
                */
                initialize: function () {
                    this.$scope.state = {
                        isRemoving: false
                    };

                    this.$scope.removeCourse = _.bind(this.removeCourse, this);
                    this.$scope.changeMaxOrders = _.bind(this.changeMaxOrders, this);
                },

                /** 
                * Remove course from menu.
                * @param {object} course - Course.
                */
                removeCourse: function(course) {
                    assert.isNotNull(course, 'course');

                    this.$scope.state.isRemoving = true;

                    this.$scope.onRemoveCourse({ course: course })
                        .finally(_.bind(function() {
                            this.$scope.state.isRemoving = false;
                        }, this));
                },

                /** 
                * Change course max orders count.
                * @param {object} course - Course.
                */
                changeMaxOrders: function(course) {
                    assert.isNotNull(course, 'course');

                    this.$scope.onChangeCourseMaxOrders({ course: course });
                }
            })
    ];

    return ordersMenuCourseController;
});