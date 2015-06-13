/**
 * adminMenuApiService.
 * @file adminMenuApiService.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(
    [
        'underscore', 'angular', 'moment', 'framework/assert', 'framework/utils'
    ],
    function(_, angular, moment, assert, utils) {
        'use strict';

        var adminMenuApiService = [
            '$http', '$q', 'admin.config', 'adminMenuApiMappingService', 'commonApiMappingService',
            function ($http, $q, adminConfig, adminMenuApiMappingService, commonApiMappingService) {
                var api = adminConfig.urls.api.menu;

                return {
                    /** 
                    * Get list of menu courses and available courses for specified date.
                    * @param {date} date - courses and orders date.
                    * @returns {object} promise for menu courses and available courses.
                    */
                    getMenuAndCourses: function(date) {
                        assert.isNotNull(date, 'date');

                        var deferred = $q.defer();

                        var options = {
                            params: {
                                date: moment(date).format('YYYY-MM-DD')
                            }
                        };

                        $http.get(api.getMenuAndCourses, options)
                            .success(function(reponse) {
                                assert.isNotNull(reponse, 'reponse');

                                var menuData = adminMenuApiMappingService.mapResponseToMenuData(reponse);
                                deferred.resolve(menuData);

                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },


                    /** 
                    * Create new course.
                    * @param {object} course - Course to create.
                    * @param {string} imageId - Course image ID.
                    */
                    createCourse: function(course, imageId) {
                        assert.isNotNull(course, 'course');

                        var deferred = $q.defer();

                        var data = {
                            CompanyId: null,
                            Name: course.name,
                            Category: course.category.name,
                            Price: course.price,
                            Description: course.description,
                            Weight: course.weight,
                            ImageId: imageId || ''
                        };

                        $http.post(api.createCourse, data)
                            .success(function(reponse) {
                                assert.isNotNull(reponse, 'reponse');

                                var createdCourse = commonApiMappingService.mapResponseToCourse(reponse);
                                deferred.resolve(createdCourse);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },      
                    

                    /** 
                    * Remove course.
                    * @param {object} course - Course to remove.
                    */
                    removeCourse: function (course) {
                        assert.isNotNull(course, 'course');

                        var deferred = $q.defer();

                        var data = {
                            CourseId: course.id
                        };

                        $http.post(api.removeCourse, data)
                            .success(function() {
                                deferred.resolve(course);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },
                    

                    /** 
                    * Update course.
                    * @param {object} course - Course to update.
                    * @param {string} imageId - Course image ID.
                    */
                    updateCourse: function(course, imageId) {
                        assert.isNotNull(course, 'course');

                        var deferred = $q.defer();

                        var data = {
                            Id: course.id,
                            CompanyId: null,
                            Name: course.name,
                            Category: course.category.name,
                            Price: course.price,
                            Description: course.description,
                            Weight: course.weight,
                            ImageId: imageId || ''
                        };

                        $http.post(api.updateCourse, data)
                            .success(function(reponse) {
                                assert.isNotNull(reponse, 'reponse');

                                var updatedCourse = commonApiMappingService.mapResponseToCourse(reponse);
                                deferred.resolve(updatedCourse);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },


                    /** 
                    * Remove Course from menu.
                    * @param {object} course - Course to remove.
                    * @param {date} date - Menu date.
                    */
                    removeCourseFromMenu: function(course, date) {
                        assert.isNotNull(course, 'course');
                        assert.isNotNull(date, 'date');

                        var deferred = $q.defer();

                        var data = {
                            CourseId: course.id,
                            Date: moment(date).format('YYYY-MM-DD')
                        };

                        $http.post(api.removeCourseFromMenu, data)
                            .success(function () {
                                deferred.resolve(course);
                            }).error(function (response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },


                    /** 
                    * Change course max orders.
                    * @param {object} course - Course to update.
                    * @param {number} maxOrders - Max orders value.
                    * @param {date} date - Menu date.
                    */
                    changeCourseMaxOrders: function(course, maxOrders, date) {
                        assert.isNotNull(course, 'course');
                        assert.isNotNull(maxOrders, 'maxOrders');
                        assert.isNotNull(date, 'date');

                        var deferred = $q.defer();

                        var data = {
                            CourseId: course.id,
                            MaxOrders: maxOrders,
                            Date: moment(date).format('YYYY-MM-DD')
                        };

                        $http.post(api.changeCourseMaxOrders, data)
                            .success(function() {
                                course.maxOrders = maxOrders;
                                deferred.resolve(course);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },             
                    
                    /** 
                    * Add course to menu.
                    * @param {object} course - Course to update.
                    * @param {number} maxOrders - Max orders value.
                    * @param {date} date - Menu date.
                    */
                    addCourseToMenu: function (course, maxOrders, date) {
                        assert.isNotNull(course, 'course');
                        assert.isNotNull(maxOrders, 'maxOrders');
                        assert.isNotNull(date, 'date');

                        var deferred = $q.defer();

                        var data = {
                            CourseId: course.id,
                            MaxOrders: maxOrders,
                            Date: moment(date).format('YYYY-MM-DD')
                        };

                        $http.post(api.addCourseToMenu, data)
                            .success(function(id) {
                                var addedCourse = angular.copy(course);
                                //addedCourse.id = id;
                                addedCourse.maxOrders = maxOrders;

                                deferred.resolve(addedCourse);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    }
                };
            }
        ];

        return adminMenuApiService;
    });