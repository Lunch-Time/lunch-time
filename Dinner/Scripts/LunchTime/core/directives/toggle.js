/**
 * toggle.
 * @file toggle.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function() {
    'use strict';

    var toggle = [
        '$parse',
        function ($parse) {

            return {
                restrict: 'A',
                link: function($scope, $element, attr) {
                    var getter = $parse(attr.toggle);
                    var setter = getter.assign;

                    $element.on('click', function() {
                        var value = !!getter($scope);
                        setter($scope, !value);
                    });
                }
            };
        }
    ];

    return toggle;
});