/**
 * adminSalesCardReaderService.
 * @file adminSalesCardReaderService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['framework/assert'], function (assert) {
    'use strict';

    var adminSalesCardReaderService = [
        '$document', '$window', '$rootScope', '$timeout', 'admin.events',
        function ($document, $window, $rootScope, $timeout, adminEvents) {

            var input = '';

            var timeoutInterval = 1000;
            var timeoutPromise = null;
            var delta = 600;
            var lastKeypressTime = 0;

            // event.type должен быть keypress
            var getSymbol = function(event) {
                if (event.which == null) { // IE
                    if (event.keyCode < 32) return null; // спец. символ
                    return String.fromCharCode(event.keyCode);
                }

                if (event.which != 0 && event.charCode != 0) { // все кроме IE
                    if (event.which < 32) return null; // спец. символ
                    return String.fromCharCode(event.which); // остальные
                }

                return null; // спец. символ
            };

            return {

                /** Start listenning for input. */
                listen: function() {
                    $document.on('keypress', function(event) {
                        event = event || $window.event;

                        // спец. сочетание - не обрабатываем
                        if (event.ctrlKey || event.altKey || event.metaKey) return;

                        var symbol = getSymbol(event || window.event);
                        if (!symbol) return;

                        var thisKeypressTime = new Date();
                        if (thisKeypressTime - lastKeypressTime > delta) {
                            lastKeypressTime = 0;
                            input = '';
                        }

                        input += symbol;
                        if (input.length == 10) {

                            if (!timeoutPromise) {
                                $rootScope.$broadcast(adminEvents.sales.cardReader.input, input);

                                timeoutPromise = $timeout(function() {                                    
                                    timeoutPromise = null;
                                }, timeoutInterval);
                            }

                            lastKeypressTime = 0;
                            input = '';
                        }

                        lastKeypressTime = thisKeypressTime;
                    });
                },

                /** 
                 * On input handler.
                 * @param {function} handler - Handler.
                 */
                onInput: function (handler) {
                    assert.isFunction(handler, 'handler');

                    $rootScope.$on(adminEvents.sales.cardReader.input, handler);
                }
            };
        }
    ];

    return adminSalesCardReaderService;
});