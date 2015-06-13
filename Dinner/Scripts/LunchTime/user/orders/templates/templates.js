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
        var templates = angular.module('lunchtime.user.orders.templates', dependencies);

        templates.run([
            '$templateCache', function($templateCache) {
                // $templateCache.put('templates/user/orders/template.tmpl', template);
            }
        ]);

        return templates;
    });