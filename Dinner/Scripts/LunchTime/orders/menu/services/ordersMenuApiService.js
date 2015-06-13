/**
 * adminMenuApiService.
 * @file adminMenuApiService.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define(
    [
        'underscore', 'angular', 'moment', 'framework/assert', 'framework/utils'
    ],
    function(_, angular, moment, assert, utils) {
        'use strict';

        var ordersMenuApiService = [
            '$http', '$q', 'orders.config', 'ordersMenuApiMappingService', 'commonApiMappingService',
            function ($http, $q, ordersConfig, ordersMenuApiMappingService, commonApiMappingService) {
                var api = ordersConfig.urls.api;

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

                                var menuData = ordersMenuApiMappingService.mapResponseToMenuData(reponse);
                                deferred.resolve(menuData);

                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },

                };
            }
        ];

        return ordersMenuApiService;
    });