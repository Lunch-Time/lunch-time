/**
 * adminSalesDateWatcherService.
 * @file adminSalesDateWatcherService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['underscore'], function(_) {
    'use strict';

    var adminSalesDateWatcherService = [
        '$interval', '$route',
        function ($interval, $route) {
            var interval = 60 * 1000;

            return {
                /** Promise for interval. */
                intervalPromise: null,

                /** Current date. */
                date: null,

                /** Watch for date change. */
                watch: function() {
                    this.date = new Date();
                    this.intervalPromise = $interval(_.bind(this._checkDate, this), interval);
                },

                /** Dispose watcher. */
                dispose: function () {
                    this.date = null;

                    if (this.intervalPromise) {
                        $interval.cancel(this.intervalPromise);
                        this.intervalPromise = null;
                    }
                },

                /** Check for date change and reload route if date was changed. */
                _checkDate: function() {
                    var currentDate = new Date();
                    var isDateChanged = currentDate.getDate() !== this.date.getDate() ||
                        currentDate.getMonth() !== this.date.getMonth() ||
                        currentDate.getFullYear() !== this.date.getFullYear();

                    if (isDateChanged) {
                        this.date = currentDate;
                        $route.reload();
                    }
                }
            };
        }
    ];

    return adminSalesDateWatcherService;
});