/**
 * main.
 * @file main.js.
 * @copyright Copyright ©
 * @description
 * Use this main file for minified version of scripts.
 */
(function (require, global, view) {
    'use strict';

    require(['require.config'], function (requireConfig) {
        var applicationUrl = global.applicationUrl;
        var libsUrl = 'Libs';
        var frameworkUrl = 'Framework';

        var config = requireConfig.getConfig(applicationUrl, libsUrl, frameworkUrl);
        require.config(config);

        require(['angular', 'application', 'angular-locale', 'text', 'framework/extensions/extensions'], function (angular, application) {
            angular.bootstrap(view, [application.name]);
        });
    });

}(require, window, document));