define([], function () {
    'use strict';

    if (!Boolean.parse)
        Boolean.parse = function (value) {
            if (typeof(value) === 'string' && value.length === 0) {
                throw Error('Boolean.parse: Cannot convert empty string to boolean.');
            }

            switch (value.toLowerCase()) {
                case 'true':
                    return true;
                case 'false':
                    return false;
                default:
                    throw Error('Boolean.parse: Cannot convert string "' + value + '" to boolean.');
            }
        };
});