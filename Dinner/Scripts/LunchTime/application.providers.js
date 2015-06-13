/**
 * Application Providers.
 * @file application.providers.js.
 * @copyright Copyright ©
 */
define([], function() {
    'use strict';

    var applicationProviders = ['$httpProvider', function ($httpProvider) {        
        // 'X-Requested-With':'XMLHttpRequest' header is required by asp.net mvc to determine if it is a ajax request.
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }];

    return applicationProviders;
});