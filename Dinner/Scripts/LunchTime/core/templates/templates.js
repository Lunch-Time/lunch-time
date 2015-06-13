/**
 * templates.
 * @file templates.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular',
        'text!core/templates/popoverHtml.tmpl.html'
    ],
    function(angular, popoverHtmlTemplate) {
        'use strict';

        var dependencies = [];
        var templates = angular.module('lunchtime.core.templates', dependencies);

        templates.run([
            '$templateCache', function($templateCache) {
                $templateCache.put('template/popover/popover-html.html', popoverHtmlTemplate);
            }
        ]);

        return templates;
    });