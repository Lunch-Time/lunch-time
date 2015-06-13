/**
 * userOrdersDayOrderController.
 * @file userOrdersDayOrderController.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var userOrdersDayOrderController = [
        '$scope', 'user.config', 'userMenuService',
        Class.create(
            /**
            * UserOrdersDayOrderController
            * @param {object} $scope - Controller scope service.
            * @param {object} userConfig - User configuration.
            * @param {object} userMenuService - User menu service.
            * @constructor
            */
            function ($scope, userConfig, userMenuService) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.userConfig = userConfig;
                this.userMenuService = userMenuService;

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    order: null,
                    isFreezed: null,
                    orderOptions: null,
                    defaultOption: null,
                    courseImage: {
                        url: null,
                        thumbnailUrl: null
                    },
                    state: {
                        isOrdering: false
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
                    this.$scope.courseImage.url = this.userConfig.urls.api.coursePicture.format(this.$scope.order.course.id);
                    this.$scope.courseImage.thumbnailUrl = this.userConfig.urls.api.courseThumbnail.format(this.$scope.order.course.id);

                    this.$scope.$watch('order.course.ordersCount', _.bind(this._updateOrdersOptions, this));

                    this.$scope.order.course.ordersCount = 3;
                    this.$scope.order.course.maxOrders = 10;
                },


                /** Update course orders options. */
                _updateOrdersOptions: function () {
                    var course = this.$scope.order.course;

                    this.$scope.orderOptions = this.userMenuService.getOrderOptionsForCourse(course);
                    this.$scope.defaultOption = this.userMenuService.getDefaultOrderOptionForCourse(course);
                }
            })
    ];

    return userOrdersDayOrderController;
});