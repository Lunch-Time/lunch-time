/**
 * userMenuCourseController.
 * @file userMenuCourseController.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var userMenuCourseController = [
        '$scope', 'user.config', 'userMenuService',
        Class.create(
            /**
            * UserMenuCourseController
            * @param {object} $scope - Controller scope service.
            * @param {object} userConfig - User configuration.
            * @param {object} userMenuService - User menu service.
            * @constructor
            */
            function($scope, userConfig, userMenuService) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.userConfig = userConfig;
                this.userMenuService = userMenuService;

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    course: null,
                    isFreezed: null,
                    isWished: null,
                    orderOptions: null,
                    defaultOption: null,
                    courseImage: {
                        url: null,
                        thumbnailUrl: null                        
                    },
                    state: {
                        isOrdering: false,
                        isWishing: false
                    }
                },

                /** User configuration. */
                userConfig: null,
                

                /** User menu service. */
                userMenuService: null,


                /** 
                * Initialize controller. 
                */
                initialize: function() {
                    this.$scope.courseImage.url = this.userConfig.urls.api.coursePicture.format(this.$scope.course.id);
                    this.$scope.courseImage.thumbnailUrl = this.userConfig.urls.api.courseThumbnail.format(this.$scope.course.id);

                    this.$scope.orderCourse = _.bind(this.orderCourse, this);
                    this.$scope.wishCourse = _.bind(this.wishCourse, this);

                    this.$scope.$watch('course.ordersCount', _.bind(this._updateOrdersOptions, this));
                },

                /** 
                 * Order course.
                 * @param {object} course - Course.
                 * @param {number} quantity - Quantity.
                 */
                orderCourse: function(course, quantity) {
                    assert.isNotNull(course, 'course');
                    assert.isNotNull(quantity, 'quantity');

                    this.$scope.state.isOrdering = true;
                    this.$scope.onOrderCourse({ course: course, quantity: quantity })
                        .finally(_.bind(function() {
                            this.$scope.state.isOrdering = false;
                        }, this));
                },


                /** 
                 * Wish course.
                 * @param {object} course - Course.
                 */
                wishCourse: function(course) {
                    assert.isNotNull(course, 'course');

                    this.$scope.state.isWishing = true;
                    this.$scope.onWishCourse({ course: course })
                        .finally(_.bind(function() {
                            this.$scope.state.isWishing = false;
                        }, this));
                },


                /** Update course orders options. */
                _updateOrdersOptions: function () {
                    var course = this.$scope.course;

                    this.$scope.orderOptions = this.userMenuService.getOrderOptionsForCourse(course);
                    this.$scope.defaultOption = this.userMenuService.getDefaultOrderOptionForCourse(course);
                }
            })
    ];

    return userMenuCourseController;
});