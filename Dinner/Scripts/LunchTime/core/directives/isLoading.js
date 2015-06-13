/**
 * isLoading.
 * @file isLoading.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['jquery', 'ladda'], function($, Ladda) {
    'use strict';

    var isLoading = [function () {

        return {
            restrict: 'A',
            link: function($scope, $element, attr) {
                var ladda = Ladda.create($element[0]);

                $scope.$watch(attr.isLoading, function(loading) {
                    if (loading) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                });
            }
        };
    }];

    return isLoading;
});