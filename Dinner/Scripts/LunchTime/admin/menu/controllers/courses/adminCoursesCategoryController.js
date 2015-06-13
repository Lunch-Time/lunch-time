/**
 * adminCoursesCategoryController.
 * @file adminCoursesCategoryController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function (_, angular, Class, assert, utils) {
    'use strict';

    var adminCoursesCategoryController = [
        '$scope', 'config',
        Class.create(
            /**
            * Admin Category Courses Controller
            * @param {object} $scope - Controller scope service.
            * @param {object} config - Application configuration.
            * @constructor
            */
            function ($scope, config) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.config = config;

                this.initialize();
            }, {
                /** Controller scope defaults. */
                $scope: {
                    category: null,
                    courses: null
                },

                /** Application configuration. */
                config: null,

                /** 
                * Initialize controller. 
                */
                initialize: function() {
                    this.$scope.addCourseToMenu = _.bind(this.addCourseToMenu, this);
                    this.$scope.editCourse = _.bind(this.editCourse, this);
                    this.$scope.removeCourse = _.bind(this.removeCourse, this);
                    this.$scope.createCourse = _.bind(this.createCourse, this);
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
                 * Edit course.
                 * @param {object} course - Course.
                  */
                editCourse: function (course) {
                    this.$scope.onEditCourse({ course: course });
                },

                /** Add new course. */
                createCourse: function() {
                    var category = this.$scope.category;
                    
                    this.$scope.onCreateCourse({ category: category });
                },

                /** 
                * Remove course.
                * @param {object} course - Course.
                */
                removeCourse: function(course) {
                    return this.$scope.onRemoveCourse({ course: course });
                }
            })
    ];

    return adminCoursesCategoryController;
});