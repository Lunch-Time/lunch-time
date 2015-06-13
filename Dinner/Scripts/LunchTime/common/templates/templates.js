/**
 * templates.
 * @file templates.js.
 * @copyright Copyright ©
 */
define([
        'angular',
        'text!common/templates/menuCategoryTitle.tmpl.html',
        'text!common/templates/categoryIcon.tmpl.html',
        'text!common/templates/weekSidebar.tmpl.html'
    ],
    function(angular, menuCategoryTitleTemplate, categoryIconTemplate, weekSidebarTemplate) {
        'use strict';

        var dependencies = [];
        var templates = angular.module('lunchtime.common.templates', dependencies);

        templates.run([
            '$templateCache', function($templateCache) {
                $templateCache.put('/templates/common/menuCategoryTitle.tmpl', menuCategoryTitleTemplate);
                $templateCache.put('/templates/common/categoryIcon.tmpl', categoryIconTemplate);
                $templateCache.put('/templates/common/weekSidebar.tmpl', weekSidebarTemplate);
            }
        ]);

        return templates;
    });