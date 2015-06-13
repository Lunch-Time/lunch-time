/**
 * orderedCourseStats.
 * @file orderedCourseStats.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['framework/assert'], function (assert) {
    'use strict';

    /**
     * Ordered course stats.
     * @param {object} course - Course.
     * @param {number} ordersLeft - Orders left count.
     * @param {number} totalOrders - Total orders count.
     * @constructor
     */
    var OrderedCourseStats = function (course, ordersLeft, totalOrders) {
        assert.isNotNull(course, 'course');
        assert.isNumber(ordersLeft, 'ordersLeft');
        assert.isNumber(totalOrders, 'totalOrders');

        this.course = course;
        this.ordersLeft = ordersLeft;
        this.totalOrders = totalOrders;
    };

    return OrderedCourseStats;
});