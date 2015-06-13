/**
 *  $q decorator.
 * @file qDecorator.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function() {
    'use strict';

    var qDecorator = ['$delegate', function ($delegate) {

        $delegate.rejectAsync = function(reason) {
            var promise = $delegate.reject(reason);
            
            return {
                then: promise.then,
                'catch': function(callback) {
                    promise.then(null, callback);
                    return promise;
                },
                'finally': function (callback) {
                    promise.then(null, callback);
                    return promise;
                }
            };
        };
        
        return $delegate;
    }];

    return qDecorator;
});