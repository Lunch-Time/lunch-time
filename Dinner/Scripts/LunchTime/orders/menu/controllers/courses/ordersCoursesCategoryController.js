/**
 * ordersCoursesCategoryController.
 * @file ordersCoursesCategoryController.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define(['underscore', 'framework/class', 'framework/assert', 'framework/utils', 'common/models/course'], function (_, Class, assert, utils, Course) {
    'use strict';

    var ordersCoursesCategoryController = [
        '$scope', 'config',
        Class.create(
            /**
            * orders Category Courses Controller
            * @param {object} $scope - Controller scope service.
            * @param {object} config - Application configuration.
            * @constructor
            */
            function ($scope, config) {
                this.$scope = utils.extend($scope, this.$scope, true);
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

    return ordersCoursesCategoryController;
});