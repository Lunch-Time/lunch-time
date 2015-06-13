/**
 * formatTimeSpanFilter.
 * @file formatTimeSpanFilter.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function (assert) {
    'use strict';

    var formatTimeSpanFilter = [function () {       
        return function(time) {
            assert.isNotNull(time, 'time');
            assert.isNumber(time.hours, 'hours');
            assert.isNumber(time.minutes, 'minutes');

            var normalize = function(value) {
                var numberFormat = value < 10 ? '0{0}' : '{0}';
                return numberFormat.format(value);
            };

            return '{0}:{1}'.format(normalize(time.hours), normalize(time.minutes));
        };
    }];

    return formatTimeSpanFilter;
});