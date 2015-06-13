/**
 * filters.
 * @file filters.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'common/filters/weight'
    ],
    function(angular, weight) {
        'use strict';

        var dependencies = [];
        var filters = angular.module('lunchtime.common.filters', dependencies);
        filters.filter('weight', weight);

        return filters;
    });