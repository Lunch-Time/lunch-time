/**
 * userMenuApiMappingService.
 * @file userMenuApiMappingService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(
    [
        'underscore', 'moment', 'framework/assert', 'framework/utils', 'core/models/timeSpan',
        'common/models/order',
        'user/menu/models/menuData'
    ],
    function (_, moment, assert, utils, TimeSpan, Order, MenuData) {
        'use strict';

        var userMenuApiMappingService = [
            'commonApiMappingService',
            function (commonApiMappingService) {
                return {

                    /** 
                     * Map responce from getCoursesAndOrders request to MenuData model.
                     * @param {object} response - response.
                     * @returns {object} MenuData.
                     * @private
                     */
                    mapResponseToMenuData: function (response) {
                        assert.isNotNull(response.Date, 'response.Date');
                        assert.isArray(response.AvailableCourses, 'response.AvailableCourses');
                        assert.isArray(response.OrderedMenus, 'response.OrderedMenus');

                        var coursesMap = {};

                        var availableCourses = _.map(response.AvailableCourses, function (courseData) {
                            var course = commonApiMappingService.mapResponseToCourse(courseData);
                            coursesMap[course.id] = course;

                            return course;
                        }, this);

                        var orders = _.map(response.OrderedMenus, function (orderData) {
                            var course = coursesMap[orderData.Course.ID];
                            assert.isNotNull(course, 'course');

                            var order = new Order(
                                orderData.Course.OrderItemID,
                                course,
                                orderData.Quantity,
                                orderData.Course.Boxindex
                            );

                            return order;
                        });

                        var menuDate = moment(response.Date).toDate();
                        var isFreezed = response.IsFreezed;
                        var freezeMoment = moment(response.FreezeTime, 'hh:mm:ss');
                        var freezeTime = new TimeSpan(freezeMoment.hour(), freezeMoment.minute());

                        var wishedCourses = _.map(response.WishedCourses, function (courseId) {
                            return coursesMap[courseId];
                        });

                        var menuData = new MenuData(menuDate, isFreezed, freezeTime, availableCourses, orders, wishedCourses);

                        return menuData;
                    }
                };
            }
        ];

        return userMenuApiMappingService;
    });