/**
 * Menu Courses Controller.
 * @file userMenuCoursesController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['angular', 'underscore', 'framework/class', 'framework/assert', 'framework/utils'], function (angular, _, Class, assert, utils) {
    'use strict';

    var userMenuCoursesController = [
        '$scope', 'userMenuService', 'menuService', 'userMenuApiService',

        /**
         * Menu controller
         * @param {object} $scope - Controller scope service.
         * @param {object} userMenuService - User menu service.
         * @param {object} menuService - Menu service.
         * @param {object} userMenuApiService - User menu API service.
         * @constructor
         */
        Class.create(
            function($scope, userMenuService, menuService, userMenuApiService) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.userMenuService = userMenuService;
                this.menuService = menuService;
                this.userMenuApiService = userMenuApiService;

                this.initialize();
            }, {
                $scope: {
                    date: null,
                    isFreezed: null,
                    courses: [],
                    categoriesMenu: [],
                    wishedCourses: []
                },

                /** User menu service. */
                userMenuService: null,

                /** Menu service. */
                menuService: null,

                /** User menu API service. */
                userMenuApiService: null,


                /** 
                 * Initialize controller. 
                 */
                initialize: function () {
                    this.$scope.$watch('courses', _.bind(this._onCoursesUpdated, this));

                    this.$scope.orderCourse = _.bind(this.orderCourse, this);
                    this.$scope.hasWished = _.bind(this.hasWished, this);
                    this.$scope.wishCourse = _.bind(this.wishCourse, this);
                },


                /** 
                 * Has wished course.
                 * @param {object} course - Course.
                 */
                hasWished: function(course) {
                    assert.isNotNull(course, 'course');

                    var hasWished = _.some(this.$scope.wishedCourses, function(wishedCourse) {
                        return wishedCourse.id === course.id;
                    });

                    return hasWished;
                },


                /** 
                 * Wish course.
                 * @param {object} course - Course.
                 */
                wishCourse: function(course) {
                    assert.isNotNull(course, 'course');

                    var onUnwished = function() {
                        utils.array.without(this.$scope.wishedCourses, course);
                    };

                    var onWished = function () {
                        var wishedCourseFromSameCategory = _.find(this.$scope.wishedCourses, function (wishedCourse) {
                            return wishedCourse.category.id === course.category.id;
                        });
                        if (!!wishedCourseFromSameCategory) {
                            utils.array.without(this.$scope.wishedCourses, wishedCourseFromSameCategory);
                        }
                        this.$scope.wishedCourses.push(course);
                    };

                    var hasWished = this.hasWished(course);

                    var promise;
                    if (hasWished) {
                        promise = this.userMenuApiService.unwishCourse(course, this.$scope.date)
                            .then(_.bind(onUnwished, this));
                    } else {
                        promise = this.userMenuApiService.wishCourse(course, this.$scope.date)
                            .then(_.bind(onWished, this));
                    }

                    return promise;
                },

                /** 
                 * Order course.
                 * @param {object} course - Course.
                 * @param {number} quantity - Quantity.
                 */
                orderCourse: function(course, quantity) {
                    assert.isNotNull(course, 'course');
                    assert.isNotNull(quantity, 'quantity');

                    return this.$scope.onOrderCourse({ course: course, quantity: quantity });
                },

                /** 
                 * Courses updated handler.
                 * @param {array} courses - Courses.
                  */
                _onCoursesUpdated: function(courses) {
                    assert.isNotNull(courses, 'courses');
                    assert.isArray(courses, 'courses');

                    this.$scope.categoriesMenu = this.menuService.groupCoursesByCategories(courses);
                }
            })
    ];

    return userMenuCoursesController;
});