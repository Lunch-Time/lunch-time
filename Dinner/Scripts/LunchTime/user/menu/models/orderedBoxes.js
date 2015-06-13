/**
 * orderedBoxes.
 * @file orderedBoxes.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['framework/assert'], function (assert) {
    'use strict';

    /** 
    * Ordered Boxes.
    * @param {array} boxes - Ordered boxes.
    */
    var OrderedBoxes = function (boxes) {
        assert.isNotNull(boxes, 'boxes');
        assert.isArray(boxes, 'boxes');
        
        this.boxes = boxes;
        this.ordersSum = 0;
    };

    return OrderedBoxes;
});