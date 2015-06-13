/**
 * boxCapacityValidationResult.
 * @file boxCapacityValidationResult.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function() {
    'use strict';

    /** 
    * Box Capacity Validation Result.
    * @param {boolean} isValid - Is box capacity validation passed.
    * @param {string} message - Validation message.
    * @constructor
    */
    var boxCapacityValidationResult = function (isValid, message) {
        this.isValid = isValid;
        this.message = message;        
    };

    return boxCapacityValidationResult;
});