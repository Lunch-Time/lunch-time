/**
 * adminCourseController.
 * @file adminCourseController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function (_, angular, Class, assert, utils) {
    'use strict';

    var adminCourseController = [
        '$scope', '$modal', '$templateCache', '$q', 'config',
        Class.create(
            /**
            * AdminCourseController
            * @param {object} $scope - Controller scope service.
            * @param {object} $modal - Modal dialog service.
            * @param {object} $templateCache - Template cache service.
            * @param {object} $q - Promise service.
            * @param {object} config - Application configuration.
            * @constructor
            */
            function($scope, $modal, $templateCache, $q, config) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.$modal = $modal;
                this.$templateCache = $templateCache;
                this.$q = $q;
                this.config = config;

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    course: null,
                    state: {
                        isRemoving: false
                    }
                },

                /** Modal dialog service */
                $modal: null,

                /** Template cache service */
                $templateCache: null,

                /** Promise service */
                $q: null,

                /** Application configuration */
                config: null,

                /** 
                * Initialize controller. 
                */
                initialize: function () {
                    this.$scope.addCourseToMenu = _.bind(this.addCourseToMenu, this);
                    this.$scope.editCourse = _.bind(this.editCourse, this);
                    this.$scope.removeCourse = _.bind(this.removeCourse, this);
                },

                /** 
                * Add course to menu.
                * @param {object} course - Course.
                */
                addCourseToMenu: function (course) {
                    assert.isNotNull(course, 'course');

                    this.$scope.onAddCourseToMenu({ course: course });
                },
                
                /** 
                * Remove course.
                * @param {object} course - Course.
                */
                removeCourse: function (course) {
                    assert.isNotNull(course, 'course');

                    var onRemoveConfirmed = function () {
                        this.$scope.state.isRemoving = true;
                        var promise = this.$scope.onRemoveCourse({ course: course });

                        promise.finally(_.bind(function() {
                            this.$scope.state.isRemoving = false;
                        }, this));
                    };

                    var dialogOptions = _.extend({}, this.config.dialogOptions, {
                        templateUrl: '/template/admin/menu/courses/course/confirm-remove.tmpl',
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

                    modalInstance.result.then(_.bind(onRemoveConfirmed, this));
                },

                /** 
                * Edit course.
                * @param {object} course - Course.
                */
                editCourse: function (course) {
                    assert.isNotNull(course, 'course');

                    this.$scope.onEditCourse({ course: course });
                }
            })
    ];

    return adminCourseController;
});