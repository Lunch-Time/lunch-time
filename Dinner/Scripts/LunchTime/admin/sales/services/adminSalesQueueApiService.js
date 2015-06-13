/**
 * adminSalesQueueApiService.
 * @file adminSalesQueueApiService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['underscore', 'framework/assert'], function(_, assert) {
    'use strict';

    var adminSalesQueueApiService = [
        '$http', '$timeout', 
        function ($http, $timeout) {
            var maxAttempts = 5;
            var intervalBetweenAttempts = 3 * 1000;
            var intervalAfterMaxAttempts = 1 * 60 * 1000;

            return {
                /** Is submitting queue. */
                isSubmitting: false,

                /** Queue. */
                queue: [],

                /** Current attempts count. */
                attempsCount: 0,

                /** Promise for timeout. */
                timeoutPromise: null,


                /** 
                 * Enqueue action.
                 * @param {string} url - Url.
                 * @param {object} data - Data.
                  */
                enqueue: function (url, data) {
                    assert.isNotNull(url, 'url');

                    this.attempsCount = 0;
                    this.queue.push({ url: url, data: data });

                    if (!this.isSubmitting) {
                        this._submitQueue();
                    }
                },


                /** Submit queued actions. */
                _submitQueue: function() {
                    if (this.queue.length === 0)
                        return;

                    if (this.timeoutPromise) {
                        $timeout.cancel(this.timeoutPromise);
                        this.timeoutPromise = null;
                    }

                    this.isSubmitting = true;

                    var item = this.queue[0];
                    $http.post(item.url, item.data)
                        .success(_.bind(this._onSubmitted, this))
                        .error(_.bind(this._onSubmitFailed, this));
                },


                /** Handler for action submit. */
                _onSubmitted: function () {
                    this.isSubmitting = false;

                    this.attempsCount = 0;
                    this.queue = this.queue.slice(1);

                    this._submitQueue();
                },

                /** Handler for action submit failure. */
                _onSubmitFailed: function(response, status) {
                    // if HTTP timeout
                    if (status === 0) {
                        this.isSubmitting = false;

                        this.attempsCount++;
                        if (this.attempsCount >= maxAttempts) {
                            this.attempsCount = 0;
                            this.timeoutPromise = $timeout(_.bind(this._submitQueue, this), intervalAfterMaxAttempts);
                        } else {
                            this.timeoutPromise = $timeout(_.bind(this._submitQueue, this), intervalBetweenAttempts);
                        }
                    } else {
                        this._onSubmitted();
                    }
                }
            };
        }
    ];

    return adminSalesQueueApiService;
});