/**
 * Application Start handlers.
 * @file application.start.js.
 * @copyright Copyright ©
 */
define(['underscore', 'application.events', 'moment'], function (_, events, moment) {
    'use strict';

    var applicationStart = {
        /** Initialize Moment.js languge and set it to 'ru'. */
        initializeMomentLang: function() {
            moment.lang('ru');
        }
    };

    return applicationStart;
});