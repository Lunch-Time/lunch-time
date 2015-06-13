/**
 * templates.
 * @file templates.js.
 * @copyright Copyright ©
 */
define(['angular'], function (angular) {
    'use strict';

    var dependencies = [];
    var templates = angular.module('lunchtime.admin.sales.templates', dependencies);
    
    templates.run(['$templateCache', function ($templateCache) {
        // $templateCache.put('templates/core/template.tmpl', template);
    }]);

    return templates;
});