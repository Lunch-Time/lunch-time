/**
 * boxTitleFilter.
 * @file boxTitleFilter.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function(assert) {
    'use strict';

    var boxTitleFilter = [function () {
        return function(box) {
            if (!box) return '';

            if (box.index === 0)
                return 'Заказ';

            return 'Бокс #{0}'.format(box.index);            
        };
    }];

    return boxTitleFilter;
});