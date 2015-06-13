/**
 * filters.
 * @file filters.js.
 * @copyright Copyright ©
 */
define(['angular',
        'user/menu/filters/boxTitleFilter'],
    function(angular, boxTitleFilter) {
        'use strict';

        var dependencies = [];
        var filters = angular.module('lunchtime.user.menu.filters', dependencies);
        filters.filter('boxTitleFilter', boxTitleFilter);

        return filters;
    });