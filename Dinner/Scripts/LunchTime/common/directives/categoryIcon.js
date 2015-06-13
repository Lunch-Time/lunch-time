/**
 * categoryIcon.
 * @file categoryIcon.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define([], function() {
    'use strict';

    var categoryIcon = [function() {

        return {
            restrict: 'AE',
            templateUrl: '/templates/common/categoryIcon.tmpl',
            scope: {
                category: '='
            },
            controller: ['$scope', 'config', function ($scope, config) {
                
                var iconUrl;
                switch ($scope.category.id) {
                    case 0:
                        iconUrl = 'salad.png';
                        break;
                    case 1:
                        iconUrl = 'soup.png';
                        break;
                    case 2:
                        iconUrl = 'meat.png';
                        break;
                    case 3:
                        iconUrl = 'garnish.png';
                        break;
                    case 4:
                        iconUrl = 'misc.png';
                        break;
                    default:
                        throw new Error('Unknown category id: {0}.'.format($scope.category.id));
                }

                $scope.categoryIconUrl = config.urls.images.categoriesIcons + iconUrl;
            }]
        };
    }];

    return categoryIcon;
});