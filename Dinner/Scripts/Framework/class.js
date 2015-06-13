define(['framework/assert', 'framework/utils'], function (assert, utils) {
    'use strict';

    var Class = function(constructor, instanceMembers, classMembers) {
        return Class.create(constructor, instanceMembers, classMembers);
    };

    /** Create a new Class with a specified constructor, instance and class members. */    
    Class.create = function(constructor, instanceMembers, classMembers) {
        constructor = constructor || function() {
        };

        if (instanceMembers) {
            utils.extend(constructor.prototype, instanceMembers);
        }

        if (classMembers) {
            utils.extend(constructor, classMembers);
        }

        return constructor;
    };

    /** Create a new Class by inheriting from another with a specified constructor, instance and class members. */
    Class.inherit = function (parent, constructor, instanceMembers, classMembers) {
        assert.isNotNull(parent, 'parent');

        var prototype = { };

        utils.extend(prototype, parent.prototype); // Extend prototype with parent members.
        if (instanceMembers) {
            utils.extend(prototype, instanceMembers); // Extend prototype with instance members.
        }
        
        constructor = constructor || function() {};
        constructor.prototype = prototype;
        utils.extend(constructor, parent); // Extend inherited Class with parent class members.
        if (classMembers) {
            utils.extend(constructor, classMembers);
        }

        constructor.prototype.constructor = constructor;
        return constructor;
    };

    /* Extend-inheritace for Class. */
    Class.extend = function(instanceMembers, classMembers) {
        var Parent = this === Class
            ? function () {}
            : this;

        instanceMembers = instanceMembers || {};
        classMembers = classMembers || {};
        
        var constructor = instanceMembers.hasOwnProperty('constructor')
            ? instanceMembers.constructor
            : function() {
                var args = utils.toArray(arguments);
                Parent.prototype.constructor.apply(this, args);
            };
        
        var Type = Class.inherit(Parent, constructor, instanceMembers, classMembers);
        Type.extend = Class.extend;

        return Type;
    };

    /** Create Class by implementing contract (a plain object) with a specified constructor, instance and class members. */
    Class.implement = function (contract, constructor, instanceMembers, classMembers) {
        var Parent = function() {};
        Parent.prototype = contract;

        return Class.inherit(Parent, constructor, instanceMembers, classMembers);
    };

    return Class;
});