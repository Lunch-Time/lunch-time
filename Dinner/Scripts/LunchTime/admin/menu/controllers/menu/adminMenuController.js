/**
 * adminMenuController.
 * @file adminMenuController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function (_, angular, Class, assert, utils) {
    'use strict';

    var adminMenuController = [
        '$scope', '$modal', 'config', 'menuService', 'adminMenuApiService',
        Class.create(
            /**
            * Admin menu controller.
            * @param {object} $scope - Controller scope service.
            * @param {object} $modal - Modal service.
            * @param {object} config - Application config.
            * @param {object} menuService - Menu service.
            * @param {object} adminMenuApiService - Admin Menu API service.
            * @constructor
            */
            function ($scope, $modal, config, menuService, adminMenuApiService) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.$modal = $modal;
                this.config = config;
                this.menuService = menuService;
                this.adminMenuApiService = adminMenuApiService;

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

                /** Admin Menu API service. */
                adminMenuApiService: null,

                /** 
                * Initialize controller. 
                */
                initialize: function () {
                    this.$scope.removeCourse = _.bind(this.removeCourse, this);
                    this.$scope.changeCourseMaxOrders = _.bind(this.changeCourseMaxOrders, this);

                    this.$scope.$watchCollection('courses', _.bind(this._onCoursesUpdated, this));
                },
                
                /** 
                * Remove course from menu.
                * @param {object} course - Course.
                */
                removeCourse: function(course) {
                    assert.isNotNull(course, 'course');
                    
                    var onRemoveCourse = function () {
                        return this.adminMenuApiService.removeCourseFromMenu(course, this.$scope.date);
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
                * Change course max orders count.
                * @param {object} course - Course.
                */
                changeCourseMaxOrders: function (course) {
                    assert.isNotNull(course, 'course');

                    var onSaveChanges = _.bind(function(maxOrders) {
                        return this.adminMenuApiService.changeCourseMaxOrders(course, maxOrders, this.$scope.date);
                    }, this);

                    var dialogOptions = _.extend({}, this.config.dialogOptions, {
                        templateUrl: '/template/admin/menu/menu/course/change-max-orders.tmpl',
                        controller: 'adminMenuCourseChangeMaxOrdersController',
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
                },

                /** 
                * Handler for courses update event.
                * @param {array} courses - Courses.
                */
                _onCoursesUpdated: function (courses) {
                    assert.isNotNull(courses, 'courses');

                    this.$scope.categoriesMenu = this.menuService.groupCoursesByCategories(courses);
                },

                /** 
                * Confirm remove course from menu.
                * @param {object} course - Course.
                */
                _confirmRemoveCourse: function(course) {
                    assert.isNotNull(course, 'course');

                    var dialogOptions = _.extend({}, this.config.dialogOptions, {
                        templateUrl: '/template/admin/menu/menu/course/confirm-remove.tmpl',
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
                }              
            })
    ];

    return adminMenuController;
});