/**
 * ordersMenuController.
 * @file ordersMenuController.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define(['underscore', 'framework/class', 'framework/assert', 'framework/utils'], function (_, Class, assert, utils) {
    'use strict';

    var ordersMenuController = [
        '$scope', '$modal', 'config', 'menuService', 'ordersMenuApiService',
        Class.create(
            /**
            * orders menu controller.
            * @param {object} $scope - Controller scope service.
            * @param {object} $modal - Modal service.
            * @param {object} config - Application config.
            * @param {object} menuService - Menu service.
            * @param {object} ordersMenuApiService - orders Menu API service.
            * @constructor
            */
            function ($scope, $modal, config, menuService, ordersMenuApiService) {
                this.$scope = utils.extend($scope, this.$scope, true);
                this.$modal = $modal;
                this.config = config;
                this.menuService = menuService;
                this.ordersMenuApiService = ordersMenuApiService;

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    course: null,
                    date: null,
                    categoriesMenu: null
                },

                /** Modal service. */
                $modal: null,

                /** Application config. */
                config: null,

                /** Menu service. */
                menuService: null,

                /** orders Menu API service. */
                ordersMenuApiService: null,

                /** 
                * Initialize controller. 
                */
                initialize: function () {
                    this.$scope.$watchCollection('courses', _.bind(this._onCoursesUpdated, this));

                    this.$scope.removeCourse = _.bind(this.removeCourse, this);
                    this.$scope.changeCourseMaxOrders = _.bind(this.changeCourseMaxOrders, this);
                },

                /** 
                * Handler for courses update event.
                * @param {array} courses - Courses.
                */
                _onCoursesUpdated: function(courses) {
                    assert.isNotNull(courses, 'courses');

                    this.$scope.categoriesMenu = this.menuService.groupCoursesByCategories(courses);
                },
                
                /** 
                * Remove course from menu.
                * @param {object} course - Course.
                */
                removeCourse: function(course) {
                    assert.isNotNull(course, 'course');
                    
                    var onRemoveCourse = function () {
                        return this.ordersMenuApiService.removeCourseFromMenu(course, this.$scope.date);
                    };

                    var onCourseRemoved = function () {
                        utils.array.without(this.$scope.courses, course);

                        return course;
                    };

                    return this._confirmRemoveCourse(course)
                        .then(_.bind(onRemoveCourse, this))
                        .then(_.bind(onCourseRemoved, this));
                },

                /** 
                * Confirm remove course from menu.
                * @param {object} course - Course.
                */
                _confirmRemoveCourse: function(course) {
                    assert.isNotNull(course, 'course');

                    var dialogOptions = _.extend({}, this.config.dialogOptions, {
                        templateUrl: '/template/orders/menu/menu/course/confirm-remove.tmpl',
                        resolve: {
                            data: function () {
                                return {
                                    course: course
                                };
                            }
                        },
                        controller: 'confirmController'
                    });

                    var modalInstance = this.$modal.open(dialogOptions);

                    return modalInstance.result;
                },
                
                /** 
                * Change course max orders count.
                * @param {object} course - Course.
                */
                changeCourseMaxOrders: function (course) {
                    assert.isNotNull(course, 'course');

                    var onSaveChanges = _.bind(function(maxOrders) {
                        return this.ordersMenuApiService.changeCourseMaxOrders(course, maxOrders, this.$scope.date);
                    }, this);

                    var dialogOptions = _.extend({}, this.config.dialogOptions, {
                        templateUrl: '/template/orders/menu/menu/course/change-max-orders.tmpl',
                        controller: 'ordersMenuCourseChangeMaxOrdersController',
                        resolve: {
                            course: function () {
                                return course;
                            },
                            onSaveChanges: function() {
                                return onSaveChanges;
                            }
                        }
                    });

                    this.$modal.open(dialogOptions);
                }
            })
    ];

    return ordersMenuController;
});