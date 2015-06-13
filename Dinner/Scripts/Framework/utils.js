define(['jquery', 'underscore', 'framework/extensions/extensions'], function ($, _) {
    'use strict';

    var utils = {};
    var staticArray = []; // Static array.

    /** Convert specified source to the array. */
    utils.toArray = function (source, from) {
        from = from || 0;
        return staticArray.slice.call(source, from);
    };

    /** Extend target with a specified members. */
    utils.extend = function (target, members, recurcive) {
        if (recurcive) {
            return utils.extendRecurcive(target, members);
        } else {
            return _.extend(target, members);
        }
    };

    utils.extendRecurcive = function (target, members) {
        var isExtendable = function (obj) {
            return _.isObject(obj) && !_.isArray(obj);
        };

        var isDefined = function (obj) {
            return !_.isUndefined(obj) && !_.isNull(obj);
        };

        for (var member in members) {
            if (!members.hasOwnProperty(member) || !isDefined(members[member]))
                continue;

            if (isDefined(target[member])) {
                if (isExtendable(members[member])) {
                    utils.extendRecurcive(target[member], members[member]);
                }
            } else {
                target[member] = members[member];
            }
        }

        return target;
    };

    /** Merge specified objects members in a single object */
    utils.merge = function (/*[arguments]*/) {
        var target = {};
        for (var index = 0; index < arguments.length; index++) {
            _.extend(target, arguments[index]);
        }

        return target;
    };

    /** Escape HTML text */
    utils.escape = function(text) {
        var escapedText = $('<div/>').text(text).html();
        return escapedText;
    };

    /** Invoke a specified function in context with a parameters */
    utils.invoke = function(fn, context, parameters) {
        // Performance optimization: http://jsperf.com/apply-vs-call-vs-invoke
        parameters = parameters || [];
        switch (context ? -1 : parameters.length) {
            case 0:
                return fn();
            case 1:
                return fn(parameters[0]);
            case 2:
                return fn(parameters[0], parameters[1]);
            case 3:
                return fn(parameters[0], parameters[1], parameters[2]);
            case 4:
                return fn(parameters[0], parameters[1], parameters[2], parameters[3]);
            case 5:
                return fn(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4]);
            case 6:
                return fn(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5]);
            case 7:
                return fn(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5], parameters[6]);
            case 8:
                return fn(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5], parameters[6], parameters[7]);
            case 9:
                return fn(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5], parameters[6], parameters[7], parameters[8]);
            case 10:
                return fn(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5], parameters[6], parameters[7], parameters[8], parameters[9]);
            default:
                return fn.apply(context, parameters);
        }
    };

    /** Invoke a set of actions
        action: { opteration, context, args }
    */
    utils.invokeActions = function (actions) {
        _.forEach((actions || []), function (action) {
            utils.invoke(action.operation, action.context, action.args);
        });
    };

    /** Creates instance of Type with specified parameters */
    utils.instantiate = function(Type, parameters) {
        var Constructor = function() {};
        Constructor.prototype = Type.prototype;

        var instance = new Constructor();
        var returnedValue = utils.invoke(Type, instance, parameters);

        var result = _.isObject(returnedValue) ? returnedValue : instance;

        return result;
    };

    utils.isEmptyGuid = function(guid) {
        var emptyGuid = '00000000-0000-0000-0000-000000000000';
        var isEmptyGuid = !guid || guid === emptyGuid;

        return isEmptyGuid;
    };

    utils.date = {
        parseJson: function (jsonDate) {
            return new Date(parseInt(jsonDate.substr(6), 10));
        }
    };

    utils.string = {
        random: function(length, characters) {
            characters = characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            var randomString = '';

            for (var i = 0; i < length; i++) {
                var characterIndex = Math.floor(Math.random() * characters.length);
                randomString += characters.substring(characterIndex, characterIndex + 1);
            }

            return randomString;
        },

        getHash: function(string) {
            var hash = 0;

            if (string.length == 0) {
                return hash;
            }

            for (var i = 0; i < string.length; i++) {
                var symbol = string.charCodeAt(i);
                hash = ((hash << 5) - hash) + symbol;
                hash = hash & hash; // Convert to 32bit integer
            }

            return hash;
        },
        
        getHashIgnoringCase: function(string) {
            var hash = 0;

            if (string.length == 0) {
                return hash;
            }

            string = string.toLowerCase();
            for (var i = 0; i < string.length; i++) {
                var symbol = string.charCodeAt(i);
                hash = ((hash << 5) - hash) + symbol;
                hash = hash & hash; // Convert to 32bit integer
            }

            return hash;
        },

        isEndsWith: function (string, endsWith) {
            string = string || '';

            if (endsWith.length > string.length)
                return false;

            if (string.length === 0 && endsWith.length === 0)
                return true;

            return string.substring(string.length - endsWith.length, string.length) === endsWith;
        },
        
        isStartsWith: function (string, startsWith) {
            string = string || '';
            if (startsWith.length > string.length)
                return false;
            
            return string.substring(0, startsWith.length) === startsWith;
        },
        
        trimEnd: function(string, subString) {
            string = string || '';

            return utils.string.isEndsWith(string, subString)
                ? string.substring(0, string.length - subString.length)
                : string;
        },
        
        trimStart: function(string, subString) {
            string = string || '';

            return utils.string.isStartsWith(string, subString)
                ? string.substring(subString.length, string.length)
                : string;
        },
        
        trimWhitespace: function(string) {
            string = string || '';
            return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        },
        
        equals: function(firstString, secondString) {
            firstString = firstString || '';
            secondString = secondString || '';

            return firstString == secondString;
        },
        
        equalsIgnoreCase: function(firstString, secondString) {
            firstString = firstString || '';
            secondString = secondString || '';

            return firstString.toLowerCase() == secondString.toLowerCase();
        }
    };

    utils.array = {
        without: function(array, item) {
            var index = array.indexOf(item);
            if (index !== -1) {
                array.splice(index, 1);
            }
        }
    };

    utils.formatParametesCollection = function (name, parameters) {
        var result = [];

        _.each(parameters, function (parameter, parameterIndex) {
            
            for (var parameterProperty in parameter)
            {
                if (!parameter.hasOwnProperty(parameterProperty)) continue;
                
                var value = parameter[parameterProperty];
                var formattedParameterName = '{0}[{1}].{2}'.format(name, parameterIndex, parameterProperty);

                result.push({ name: formattedParameterName, value: value });
            }
        });

        return result;
    };

    return utils;
});