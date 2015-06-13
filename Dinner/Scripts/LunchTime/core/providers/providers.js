/**
 * providers.
 * @file providers.js.
 * @copyright Copyright ©
 */
define(['angular', 'core/providers/qDecorator'], function (angular, $qDecorator) {
    'use strict';

    var dependencies = [];
    var providers = angular.module('lunchtime.core.providers', dependencies);

    providers.config(['$provide', function ($provide) {
        $provide.decorator('$q', $qDecorator);
    }]);
    
    return providers;
});