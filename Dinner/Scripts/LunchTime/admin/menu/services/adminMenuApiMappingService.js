/**
 * adminMenuApiMappingService.
 * @file adminMenuApiMappingService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(
    [
        'underscore', 'moment', 'framework/assert', 'framework/utils',
        'admin/menu/models/menuData'
    ],
    function(_, moment, assert, utils, MenuData) {
        'use strict';

        var adminMenuApiMappingService = [
            'commonApiMappingService',
            function(commonApiMappingService) {
                return {

                    /** 
                     * Map responce from getMenuAndCourses request to MenuData model.
                     * @param {object} response - response.
                     * @returns {object} MenuData.
                     * @private
                     */
                    mapResponseToMenuData: function(response) {
                        assert.isNotNull(response.Date, 'response.Date');
                        assert.isArray(response.AvailableCourses, 'response.AvailableCourses');
                        assert.isArray(response.MenuCourses, 'response.MenuCourses');

                        var menuDate = moment(response.Date).toDate();

                        var availableCourses = _.map(response.AvailableCourses, commonApiMappingService.mapResponseToCourse, this);

                        var menuCourses = _.map(response.MenuCourses, commonApiMappingService.mapResponseToCourse, this);

                        var menuData = new MenuData(menuDate, menuCourses, availableCourses);

                        return menuData;
                    }
                };
            }
        ];

        return adminMenuApiMappingService;
    });