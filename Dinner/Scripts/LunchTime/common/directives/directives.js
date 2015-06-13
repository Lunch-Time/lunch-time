/**
 * directives.
 * @file directives.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'common/templates/templates',
        'common/directives/menuCategoryTitle',
        'common/directives/categoryIcon',
        'common/directives/weekSidebar'
    ],
    function (angular, templates, menuCategoryTitle, categoryIcon, weekSidebar) {
        'use strict';

        var dependencies = [templates.name];
        var directives = angular.module('lunchtime.common.directives', dependencies);
        directives.directive('ltMenuCategoryTitle', menuCategoryTitle);
        directives.directive('ltCategoryIcon', categoryIcon);
        directives.directive('ltWeekSidebar', weekSidebar);

        return directives;
    });