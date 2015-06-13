/**
 * adminCoursesController.
 * @file adminCoursesController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils', 'common/models/course'], function (_, angular, Class, assert, utils, Course) {
    'use strict';

    var adminCoursesController = [
        '$scope', '$modal', 'menuService', 'adminMenuApiService', 'config',
        Class.create(
            /**
            * AdminCoursesController
            * @param {object} $scope - Controller scope service.
            * @param {object} $modal - Modal dialog service.
            * @param {object} menuService - Menu service.
            * @param {object} adminMenuApiService - Admin menu API service.
            * @param {object} config - Application configuration.
            * @constructor
            */
            function($scope, $modal, menuService, adminMenuApiService, config) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.$modal = $modal;
                this.menuService = menuService;
                this.adminMenuApiService = adminMenuApiService;
                this.config = config;

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    courses: null,
                    categoriesCourses: null
                },

                /** Modal dialog service */
                $modal: null,

                /** Menu service. */
                menuService: null,

                /** Admin menu API service. */
                adminMenuApiService: null,

                /** Application configuration. */
                config: null,

                /** 
                * Initialize controller. 
                */
                initialize: function() {
                    this.$scope.$watchCollection('courses', _.bind(this._onCoursesUpdated, this));

                    this.$scope.addCourseToMenu = _.bind(this.addCourseToMenu, this);
                    this.$scope.createCourse = _.bind(this.createCourse, this);
                    this.$scope.editCourse = _.bind(this.editCourse, this);
                    this.$scope.removeCourse = _.bind(this.removeCourse, this);
                },

                /** 
                * Add course to menu.
                * @param {object} course - Course.
                */
                addCourseToMenu: function(course) {
                    assert.isNotNull(course, 'course');
                    this.$scope.onAddCourseToMenu({ course: course });
                },


                /** 
                 * Create course.
                 * @param {object} category - Course category.
                 */
                createCourse: function(category) {
                    assert.isNotNull(category, 'category');

                    var onCourseCreated = function(course) {
                        assert.isNotNull(course, 'course');

                        this.$scope.courses.push(course);
                    };

                    var onSaveChange = _.bind(function(course, imageId) {
                        assert.isNotNull(course, 'course');

                        var promise = this.adminMenuApiService.createCourse(course, imageId);

                        promise.then(_.bind(onCourseCreated, this));

                        return promise;
                    }, this);

                    var dialogOptions = _.extend({}, this.config.dialogOptions, {
                        templateUrl: '/template/admin/menu/courses/course/create.tmpl',
                        controller: 'adminCourseEditController',
                        windowClass: 'modal-wide',
                        resolve: {
                            course: function() {
                                return new Course(0, '', 0, category, 0, 0, 0);
                            },
                            onSaveChange: function() {
                                return onSaveChange;
                            },
                            dialogOptions: function () {
                                return {
                                    title: 'Создание нового блюда'
                                };
                            }
                        }
                    });

                    this.$modal.open(dialogOptions);
                },


                /** 
                 * Edit course.
                 * @param {object} course - Course.
                  */
                editCourse: function(course) {
                    assert.isNotNull(course, 'course');

                    var onCourseUpdated = function (updatedCourse) {
                        assert.isNotNull(updatedCourse, 'updatedCourse');

                        var courseIndex = _.indexOf(this.$scope.courses, course);
                        this.$scope.courses[courseIndex] = updatedCourse;
                    };

                    var onSaveChange = _.bind(function (changedCourse, imageId) {
                        assert.isNotNull(changedCourse, 'changedCourse');

                        var promise = this.adminMenuApiService.updateCourse(changedCourse, imageId);

                        promise.then(_.bind(onCourseUpdated, this));

                        return promise;
                    }, this);

                    var dialogOptions = _.extend({}, this.config.dialogOptions, {
                        templateUrl: '/template/admin/menu/courses/course/edit.tmpl',
                        controller: 'adminCourseEditController',
                        windowClass: 'modal-wide',
                        resolve: {
                            course: function () {
                                return angular.copy(course);
                            },
                            onSaveChange: function () {
                                return onSaveChange;
                            },
                            dialogOptions: function() {
                                return {
                                    title: 'Редактирование блюда'
                                };
                            }
                        }
                    });

                    this.$modal.open(dialogOptions);
                },


                /** 
                 * Remove course.
                 * @param {object} course - Course.
                  */
                removeCourse: function(course) {
                    assert.isNotNull(course, 'course');

                    var onCourseRemoved = function() {
                        utils.array.without(this.$scope.courses, course);
                    };

                    var promise = this.adminMenuApiService.removeCourse(course);

                    promise.then(_.bind(onCourseRemoved, this));

                    return promise;
                },


                /** 
                * Handler for courses update event.
                * @param {array} courses - Courses.
                */
                _onCoursesUpdated: function(courses) {
                    if (courses) {
                        if (this.$scope.categoriesCourses) {
                            this.menuService.updateCategoriesMenus(this.$scope.categoriesCourses, courses);
                        } else {
                            this.$scope.categoriesCourses = this.menuService.groupCoursesByCategories(courses);
                        }
                    }
                }
            })
    ];

    return adminCoursesController;
});