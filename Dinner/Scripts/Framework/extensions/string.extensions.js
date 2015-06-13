define([], function() {
    'use strict';

    if (!String.prototype.format)
        String.prototype.format = function() {
            var string = this,
                index = arguments.length;

            while (index--) {
                string = string.replace(new RegExp('\\{' + index + '\\}', 'gm'), arguments[index]);
            }
            return string;
        };

    if (!String.isNullOrEmpty)
        String.isNullOrEmpty = function(string) {
            if (!string || string.length === 0)
                return true;

            return false;
        };
});