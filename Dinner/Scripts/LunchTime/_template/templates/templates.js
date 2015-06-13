/**
 * templates.
 * @file templates.js.
 * @copyright Copyright ©
 */
define(
    [
        'angular'
    ],
    function(angular) {
        'use strict';

        var dependencies = [];
        var templates = angular.module('lunchtime._template.templates', dependencies);

        templates.run([
            '$templateCache', function($templateCache) {
                // $templateCache.put('templates/_template/template.tmpl', template);
            }
        ]);

        return templates;
    });