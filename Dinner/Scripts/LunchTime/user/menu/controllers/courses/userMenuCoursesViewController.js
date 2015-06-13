/**
 * Menu view controller.
 * @file userMenuViewController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(
    [
        'angular', 'underscore', 'framework/class', 'framework/assert', 'framework/utils'
    ],
    function(angular, _, Class, assert, utils) {
        'use strict';

        var userMenuCoursesViewController = [
            '$scope', 'userMenuService', 'menuService',

            /**
             * Menu view controller
             * @param {object} $scope - Controller scope service.
             * @param {object} userMenuService - User menu service.
             * @param {object} menuService - Menu service.
             * @constructor
             */
            Class.create(
                function($scope, userMenuService, menuService) {
                    this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                    this.userMenuService = userMenuService;
                    this.menuService = menuService;

                    this.initialize();
                }, {
                    $scope: {
                        date: null,
                        courses: [],
                        categoriesMenu: []
                    },

                    /** User menu service. */
                    userMenuService: null,

                    /** Menu service. */
                    menuService: null,


                    /** 
                     * Initialize controller. 
                     */
                    initialize: function() {
                        this.$scope.$watch('courses', _.bind(this._onCoursesUpdated, this));
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

        return userMenuCoursesViewController;
    });