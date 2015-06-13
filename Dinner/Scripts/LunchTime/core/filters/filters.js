/**
 * filters.
 * @file filters.js.
 * @copyright Copyright ©
 */
define(['angular',
        'core/filters/formatTimeSpanFilter'],
    function(angular, formatTimeSpanFilter) {
        'use strict';

        var dependencies = [];
        var filters = angular.module('lunchtime.core.filters', dependencies);
        filters.filter('formatTimeSpan', formatTimeSpanFilter);

        return filters;
    });