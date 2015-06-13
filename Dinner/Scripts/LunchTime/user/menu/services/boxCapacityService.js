/**
 * boxCapacityService.
 * @file boxCapacityService.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([
        'underscore', 'framework/assert',
        'common/models/categories',
        'user/menu/models/boxCapacityValidationResult'
    ],
    function(_, assert, categories, BoxCapacityValidationResult) {
        'use strict';

        var boxCapacityService = [
            function() {
                return {
                    checkBoxCapacity: function(orders) {
                        assert.isNotNull(orders, 'orders');

                        // TODO: Enable box capacity service.
                        return new BoxCapacityValidationResult(true);

                        var validationRules = [this._checkSalads, this._checkOthers, this._checkSoups, this._checkMeatAndGarnish];
                        for (var i = 0; i < validationRules.length; i++) {
                            var validationResult = validationRules[i](orders);
                            if (!validationResult.isValid)
                                return validationResult;
                        }

                        return new BoxCapacityValidationResult(true);
                    },

                    _checkSalads: function(orders) {
                        var isSaladInBox = _.any(orders, function(order) {
                            return order.course.category.id === categories.salad;
                        });
                        if (isSaladInBox) {
                            return new BoxCapacityValidationResult(false, 'Салаты уже упакованы в боксы.');
                        }

                        return new BoxCapacityValidationResult(true);
                    },

                    _checkOthers: function(orders) {
                        var isOtherInBox = _.any(orders, function(order) {
                            return order.course.category.id === categories.other;
                        });
                        if (isOtherInBox) {
                            return new BoxCapacityValidationResult(false, 'Блюда из категории "Другое" нельзя помещать в боксы.');
                        }

                        return new BoxCapacityValidationResult(true);
                    },

                    _checkSoups: function(orders) {
                        var soups = _.filter(orders, function(order) {
                            return order.course.category.id === categories.soup;
                        });

                        // No soups - no problems.
                        if (soups.length === 0)
                            return new BoxCapacityValidationResult(true);

                        // Soup cannot be mixed with other course.
                        if (soups.length !== orders.length)
                            return new BoxCapacityValidationResult(false, 'Суп должен находиться в отдельном боксе');

                        // Soup cannot be mixed with other soup.
                        if (soups.length > 1)
                            return new BoxCapacityValidationResult(false, 'Нельзя смешивать два разных супа в одном боксе.');

                        // Container could contain only 1 portion of soup.
                        var soup = soups[0];
                        if (soup.quantity > 1)
                            return new BoxCapacityValidationResult(false, 'Нельзя поместить больше одной порции супа в бокс.');

                        return new BoxCapacityValidationResult(true);
                    },

                    _checkMeatAndGarnish: function(orders) {
                        var totalQuantity = 0;
                        _.each(orders, function(order) {
                            totalQuantity += order.quantity;
                        });

                        if (totalQuantity > 2)
                            return new BoxCapacityValidationResult(false, 'Нельзя поместить больше двух порций в один конейнер.');

                        return new BoxCapacityValidationResult(true);
                    }
                };
            }
        ];

        return boxCapacityService;
    });