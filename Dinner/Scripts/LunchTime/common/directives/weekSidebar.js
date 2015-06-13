/**
 * weekSidebar.
 * @file weekSidebar.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['moment', 'framework/assert'], function (moment, assert) {
    'use strict';
    
    var weekSidebar = [
        function() {

            return {
                restrict: 'AE',
                templateUrl: '/templates/common/weekSidebar.tmpl',
                scope: {
                    currentDate: '=',
                    isActiveDate: '=',
                    onDateChanged: '&'
                },
                transclude: true,
                controller: [
                    '$scope', function ($scope) {
                        var getWeek = function(currentDate) {
                            assert.isNotNull(currentDate, 'currentDate');

                            var firstDayOfWeek = moment(currentDate).weekday(0);
                            var lastDayOfWeek = moment(currentDate).weekday(4);

                            var title = firstDayOfWeek.month() === lastDayOfWeek.month()
                                ? '{0} - {1} {2}'.format(firstDayOfWeek.format('D'), lastDayOfWeek.format('D'), firstDayOfWeek.format('MMMM'))
                                : '{0} - {1}'.format(firstDayOfWeek.format('D MMMM'), lastDayOfWeek.format('D MMMM'));

                            var weekDates = [];
                            for (var dayOfWeek = 0; dayOfWeek <= 4; dayOfWeek++) {
                                var weekday = moment(currentDate).weekday(dayOfWeek).toDate();
                                weekDates.push(weekday);
                            }

                            return {
                                title: title,
                                dates: weekDates
                            };
                        };

                        $scope.$watch('currentDate', function(currentDate) {
                            $scope.week = getWeek(currentDate);
                        });

                        $scope.previousWeek = function() {                            
                            var previousMonday = moment($scope.currentDate).weekday(-7).toDate();
                            $scope.onDateChanged(previousMonday);
                        };

                        $scope.nextWeek = function () {
                            var nextMonday = moment($scope.currentDate).weekday(7).toDate();
                            $scope.changeDate(nextMonday);
                        };

                        $scope.changeDate = function (date) {
                            assert.isNotNull(date, 'date');

                            $scope.onDateChanged({ date: date });
                        };

                        $scope.isActive = function(date) {
                            assert.isNotNull(date, 'date');

                            if (!$scope.isActiveDate) {
                                return false;
                            }

                            var isActive = moment($scope.currentDate).diff(moment(date), 'days') === 0;

                            return isActive;
                        };
                    }
                ]
            };
        }
    ];

    return weekSidebar;
});