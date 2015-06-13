/**
 * commonApiMappingService.
 * @file commonApiMappingService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(
    [
        'framework/assert',
        'common/models/course', 'common/models/order'
    ],
    function (assert, Course, Order) {
    'use strict';

    var commonApiMappingService = [
        'categoryService',
        function (categoryService) {
            return {
                /** 
                 * Map reponse to Course model.
                 * @param {object} response - Course response.
                 * @returns {object} Course.
                 */
                mapResponseToCourse: function(response) {
                    var category = categoryService.getCategoryById(response.CategoryType);

                    var course = new Course(
                        response.ID,
                        response.Name,
                        response.Price,
                        category,
                        response.MenuItemID || 0,
                        response.MaxOrders || 0,
                        response.OrderedQuantity || 0,
                        response.Description,
                        response.Weight);

                    return course;
                },


                /** 
                 * Map respose to Order model.
                 * @param {object} respose - Order response.
                 * @param {object} coursesMap - Courses map.
                 * @returns {object} Order.
                 */
                mapResponseToOrder: function(response, coursesMap) {
                    assert.isNotNull(response, 'response');
                    assert.isNotNull(coursesMap, 'coursesMap');

                    var course = coursesMap[response.Course.ID];
                    if (!course) {
                        course = this.mapResponseToCourse(response.Course);
                        coursesMap[course.id] = course;
                    }

                    assert.isNotNull(course, 'course');

                    var order = new Order(
                        response.Course.OrderItemID,
                        course,
                        response.Quantity,
                        response.Course.Boxindex
                    );

                    return order;
                }
            };
        }
    ];

    return commonApiMappingService;
});