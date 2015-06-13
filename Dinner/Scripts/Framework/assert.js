define(['underscore', 'framework/extensions/extensions'], function(_) {
    'use strict';

    var assert = {
        isNotNull: function (value, name, message) {
            if (value === undefined || value === null) {
                var errorMessage = message || (name
                    ? '"{0}" cannot be undefined.'
                    : 'Specified value cannot be undefined.');
                throw new Error(errorMessage.format(name));
            }

            return this;
        },

        isFunction: function (value, name, message) {
            if (!_.isFunction(value)) {
                var errorMessage = message || (name
                    ? '"{0}" is not a function.'
                    : 'Specified value is not a function.');
                throw new Error(errorMessage.format(name));
            }

            return this;
        },     
        
        isString: function (value, name, message) {
            if (!_.isString(value)) {
                var errorMessage = message || (name
                    ? '"{0}" is not a string.'
                    : 'Specified value is not a string.');
                throw new Error(errorMessage.format(name));
            }

            return this;
        },
        
        isArray: function (value, name, message) {
            if (!_.isArray(value)) {
                var errorMessage = message || (name
                    ? '"{0}" is not a array.'
                    : 'Specified value is not a array.');
                throw new Error(errorMessage.format(name));
            }

            return this;
        },
        
        isObject: function(value, name, message) {
            if (!_.isObject(value)) {
                var errorMessage = message || (name
                    ? '"{0}" is not a object.'
                    : 'Specified value is not a object.');
                throw new Error(errorMessage.format(name));
            }

            return this;
        },
        
        isNumber: function(value, name, message) {
            if (!_.isNumber(value)) {
                var errorMessage = message || (name
                    ? '"{0}" is not a number.'
                    : 'Specified value is not a number.');
                throw new Error(errorMessage.format(name));
            }

            return this;
        },
        
        isTrue: function(value, name, message) {
            if (!value) {
                var errorMessage = message || (name
                    ? '"{0}" is not a "true".'
                    : 'Specified value is not a "true".');
                throw new Error(errorMessage.format(name));
            }

            return this;
        },
        
        isFalse: function(value, name, message) {
            if (value) {
                var errorMessage = message || (name
                    ? '"{0}" is not a "false".'
                    : 'Specified value is not a "false".');
                throw new Error(errorMessage.format(name));
            }

            return this;
        },
        
        isMatch: function(value, pattern, name, message) {
            if (!pattern.test(value)) {
                var errorMessage = message || (name
                    ? '"{0}" is not match pattern.'
                    : 'Specified value is not match pattern.');
                throw new Error(errorMessage.format(name));
            }

            return this;
        },

        isDate: function (value, name, message) {
            if (!_.isDate(value)) {
                var errorMessage = message || (name
                    ? '"{0}" is not a date.'
                    : 'Specified value is not a date.');
                throw new Error(errorMessage.format(name));
            }

            return this;
        }
    };

    return assert;
});