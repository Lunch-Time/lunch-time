/**
 * Category Service.
 * @file categoryService.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/assert', 'common/models/category', 'common/models/categories'],
    function (_, angular, assert, Category, categories) {
    'use strict';

    var categoryService = [ function () {
        return {
            
            /** 
            * Get all avaiable categories.
            * @returns {array} list of categories.
            */
            getCategories: function() {
                return [
                    new Category(categories.salad, 'Салаты'),
                    new Category(categories.soup, 'Супы'),
                    new Category(categories.meat, 'Основные блюда'),
                    new Category(categories.garnish, 'Гарниры'),
                    new Category(categories.other, 'Другое')
                ];
            },
            
            /** 
            * Get all avaiable categories.
            * @returns {object} list of categories.
            */
            getCategoriesMap: function () {
                return {
                    salad: this.getCategoryById(categories.salad),
                    soup: this.getCategoryById(categories.soup),
                    meat: this.getCategoryById(categories.meat),
                    garnish: this.getCategoryById(categories.garnish),
                    other: this.getCategoryById(categories.other)
                };
            },
            
            /** 
             * Get category with specified ID.
             * @param {number} id - category ID.
             * @returns {object} category with specified ID or throws error.
            */
            getCategoryById: function(id) {
                assert.isNotNull(id, 'id');

                var categoriesList = this.getCategories();
                var result = _.find(categoriesList, function(category) {
                    return category.id === id;
                });
                
                if (!result)
                    throw new Error('Category with id "{0}" not found.'.format(id));

                return result;
            },
            
            /** 
            * Check restrictions for half portion ordering.
            * @param {object} category - category to check.
            * @returns {boolean} true if it's allowed to order half portion for specified category, otherwise - false.
            */
            isHalfPortionsAllowed: function (category) {
                assert.isNotNull(category, 'category');
                
                switch (category.id) {
                    case categories.salad: // Салаты
                        return false;
                    case categories.soup: // Супы
                        return false;
                    case categories.meat: // Основные блюда
                        return false;
                    case categories.garnish: // Гарниры
                        return false;
                    case categories.other: // Другое
                        return false;
                    default:
                        throw new Error('Half portions restrictions for category with id "{0}" not found.'.format(category.id));
                }
            }
        };
    }];

    return categoryService;
});