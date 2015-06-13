/**
 * sales.start.
 * @file sales.start.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    var salesStart = {
        /** Initialize card reader. */
        initializeCardReader: [
            'adminSalesCardReaderService', function(adminSalesCardReaderService) {
                adminSalesCardReaderService.listen();
            }
        ]
    };

    return salesStart;
});