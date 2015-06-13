/**
 * popoverHtmlPopup.
 * @file popoverHtmlPopup.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    var popoverHtmlPopup = [
        function() {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    title: '@',
                    content: '@',
                    placement: '@',
                    animation: '&',
                    isOpen: '&'
                },
                templateUrl: 'template/popover/popover-html.html'
            };
        }
    ];

    return popoverHtmlPopup;
});