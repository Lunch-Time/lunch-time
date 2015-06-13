/**
 * Time Span.
 * @file timeSpan.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'framework/assert'], function (_, assert) {
    'use strict';

    /** 
    * Time Span (Hours, Minutes, Seconds).
    * @param {number} hours - Hours value.
    * @param {number} minutes - Minutes value.
    * @param {number} seconds - Seconds value (optional).
    */
    var TimeSpan = function(hours, minutes, seconds) {
        assert.isNumber(hours);
        assert.isTrue(hours >= 0 && hours < 24, 'hours', '"{0}" value must be between 0 and 23.');

        assert.isNumber(minutes);
        assert.isTrue(minutes >= 0 && minutes < 59, 'minutes', '"{0}" value must be between 0 and 59.');
        if (!_.isUndefined(seconds)) {
            assert.isNumber(seconds);
            assert.isTrue(seconds >= 0 && seconds < 59, 'seconds', '"{0}" value must be between 0 and 59.');
        }

        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds || 0;
    };

    return TimeSpan;
});