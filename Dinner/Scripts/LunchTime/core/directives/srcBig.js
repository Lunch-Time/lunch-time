/**
 * srcBig.
 * @file srcBig.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['jquery', 'glisse'], function ($) {
    'use strict';

    var srcBig = [
        'config',
        function (config) {

            return {
                restrict: 'A',
                scope: null,
                link: function ($scope, element, attr) {
                    var $element = $(element[0]);

                    var bigImageSrc = attr.srcBig;

                    $element.attr('data-glisse-big', bigImageSrc);
                    $element.glisse(config.plugins.glisse);
                }
            };
        }
    ];

    return srcBig;
});