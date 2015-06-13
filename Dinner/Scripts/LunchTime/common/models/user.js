/**
 * user.
 * @file user.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['framework/assert'], function(assert) {
    'use strict';

    /**
     * User.
     * @param {number} id - User ID.
     * @param {string} name - User name.
     * @param {string} identityNumber - User identity number.
     * @constructor
     */
    var User = function (id, name, identityNumber) {
        assert.isNotNull(id, 'id');
        assert.isNotNull(name, 'name');
        assert.isNotNull(identityNumber, 'identityNumber');

        this.id = id;
        this.name = name;
        this.identityNumber = identityNumber;
    };

    return User;
});