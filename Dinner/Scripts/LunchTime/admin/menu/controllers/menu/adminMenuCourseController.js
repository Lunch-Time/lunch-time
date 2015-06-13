/**
 * adminMenuCourseController.
 * @file adminMenuCourseController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var adminMenuCourseController = [
        '$scope', 'admin.config',
        Class.create(
            /**
            * Admin menu course controller
            * @param {object} $scope - Controller scope service.
            * @param {object} adminConfig - Administrator configuration.
            * @constructor
            */
            function ($scope, adminConfig) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.adminConfig = adminConfig;

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    course: null,
                    date: null,
                    courseImage: {
                        url: null,
                        thumbnailUrl: null
                    },
                    state: {
                        isRemoving: false
                    }
                },

                /** Administrator configuration. */
                adminConfig: null,
                
                                
                /** 
                * Initialize controller. 
                */
                initialize: function () {
                    this.$scope.courseImage.url = this.adminConfig.urls.api.menu.coursePicture.format(this.$scope.course.id);
                    this.$scope.courseImage.thumbnailUrl = this.adminConfig.urls.api.menu.courseThumbnail.format(this.$scope.course.id);

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

    return adminMenuCourseController;
});