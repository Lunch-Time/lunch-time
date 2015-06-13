/**
 * adminManageMenuController.
 * @file adminManageMenuController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils', 'toastr'], function (_, angular, Class, assert, utils, toastr) {
    'use strict';

    var adminManageMenuController = [
        '$scope', '$q', '$modal', 'config', 'adminMenuApiService', 'menuData',
        Class.create(
            /**
            * Admin Menu Controller
            * @param {object} $scope - Controller scope service.
            * @param {object} $q - Promise service.
            * @param {object} $modal - Modal service.
            * @param {object} config - Application config.
            * @param {object} adminMenuApiService - Admin Menu API service.
            * @param {object} menuData - Menu Data.
            * @constructor
            */
            function($scope, $q, $modal, config, adminMenuApiService, menuData) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.$q = $q;
                this.$modal = $modal;
                this.config = config;
                this.adminMenuApiService = adminMenuApiService;

                this.initialize(menuData);
            }, {
                /** Controller scope defaults. */
                $scope: {
                    date: null,
                    menuCourses: [],
                    availableCourses: []
                },

                /** Promise service. */
                $q: null,     
                
                /** Modal service. */
                $modal: null,

                /** Application config. */
                config: null,

                /** Admin Menu API service. */
                adminMenuApiService: null,
                
                /** 
                * Initialize controller. 
                * @param {object} menuData - Menu Data.
                */
                initialize: function(menuData) {
                    assert.isNotNull(menuData, 'menuData');

                    this.$scope.date = menuData.date;
                    this.$scope.menuCourses = menuData.menuCourses;
                    this.$scope.availableCourses = menuData.availableCourses;

                    this.$scope.addCourseToMenu = _.bind(this.addCourseToMenu, this);
                },

                /** 
                * Add course to menu.
                * @param {object} course - Course.
                */
                addCourseToMenu: function (course) {
                    assert.isNotNull(course, 'course');

                    var onCourseAddedToMenu = function (addedCourse) {
                        var menuCourse = _.find(this.$scope.menuCourses, function(existingCourse) {
                            return existingCourse.id === addedCourse.id;
                        });

                        if (!!menuCourse) {
                            var menuCourseIndex = _.indexOf(this.$scope.menuCourses, menuCourse);
                            this.$scope.menuCourses[menuCourseIndex] = addedCourse;
                        } else {
                            this.$scope.menuCourses.push(addedCourse);
                        }
                    };

                    var onSaveChanges = _.bind(function (maxOrders) {
                        var promise = this.adminMenuApiService.addCourseToMenu(course, maxOrders, this.$scope.date);
                        promise.then(_.bind(onCourseAddedToMenu, this));

                        return promise;
                    }, this);

                    var dialogOptions = _.extend({}, this.config.dialogOptions, {
                        templateUrl: '/template/admin/menu/add-course-to-menu.tmpl',
                        controller: 'adminMenuCourseChangeMaxOrdersController',
                        resolve: {
                            course: function () {
                                return course;
                            },
                            onSaveChanges: function () {
                                return onSaveChanges;
                            }
                        }
                    });

                    this.$modal.open(dialogOptions);
                }
            })
    ];

    return adminManageMenuController;
});