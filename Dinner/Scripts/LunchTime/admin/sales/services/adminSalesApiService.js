/**
 * adminSalesApiService.
 * @file adminSalesApiService.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['underscore', 'angular', 'moment', 'framework/assert', 'framework/utils'],
    function (_, angular, moment, assert, utils) {
        'use strict';

        var adminSalesApiService = [
            '$http', '$q', 'admin.config', 'adminSalesApiMappingService', 'adminSalesQueueApiService',
            function ($http, $q, adminConfig, adminSalesApiMappingService, adminSalesQueueApiService) {

                var api = adminConfig.urls.api.sales;

                return {

                    /** 
                     * Get users orders for specified date.
                     * @param {date} date - Date.
                     */
                    getUsersOrders: function(date) {
                        assert.isNotNull(date, 'date');

                        var deferred = $q.defer();

                        var options = {
                            params: {
                                date: moment(date).format('YYYY-MM-DD')
                            }
                        };

                        $http.get(api.getUsersOrders, options)
                            .success(function(reponse) {
                                assert.isNotNull(reponse, 'reponse');

                                var salesData = adminSalesApiMappingService.mapResponseToSalesData(reponse);
                                deferred.resolve(salesData);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },

                    /** 
                     * Purchase order. 
                     * @param {object} userOrder - User order.
                     * @param {date} date - Date.
                     */
                    purchaseOrder: function(userOrder, date) {
                        assert.isNotNull(userOrder, 'userOrder');
                        assert.isNotNull(date, 'date');

                        if (userOrder.isPurchased) {
                            $q.when(userOrder);
                        }

                        var deferred = $q.defer();

                        var data = {
                            OrderId: userOrder.id,
                            Date: moment(date).format('YYYY-MM-DD')
                        };

                        adminSalesQueueApiService.enqueue(api.purchaseOrder, data);

                        userOrder.isPurchased = true;
                        return $q.when(userOrder);
/*                        $http.post(api.purchaseOrder, data)
                            .success(function() {
                                userOrder.isPurchased = true;

                                deferred.resolve(userOrder);
                            }).error(function(response, status) {
                                deferred.reject(response);
                            });*/

                        return deferred.promise;
                    },


                    /** 
                     * Undo purchase order. 
                     * @param {object} userOrder - User order.
                     * @param {date} date - Date.
                     */
                    undoPurchaseOrder: function(userOrder, date) {
                        assert.isNotNull(userOrder, 'userOrder');
                        assert.isNotNull(date, 'date');

                        if (!userOrder.isPurchased) {
                            $q.when(userOrder);
                        }

                        var deferred = $q.defer();

                        var data = {
                            OrderId: userOrder.id,
                            Date: moment(date).format('YYYY-MM-DD')
                        };

                        adminSalesQueueApiService.enqueue(api.undoPurchaseOrder, data);

                        userOrder.isPurchased = false;
                        return $q.when(userOrder);

/*                        $http.post(api.undoPurchaseOrder, data)
                            .success(function() {
                                userOrder.isPurchased = false;

                                deferred.resolve(userOrder);
                            }).error(function (response, status) {
                                deferred.reject(response);
                            });

                        return deferred.promise;*/
                    },


                    /** 
                     * Remove order. 
                     * @param {object} userOrder - User order.
                     * @param {date} date - Date.
                     */
                    removeOrder: function(userOrder, date) {
                        assert.isNotNull(userOrder, 'userOrder');
                        assert.isNotNull(date, 'date');

                        var deferred = $q.defer();

                        var data = {
                            OrderId: userOrder.id,
                            Date: moment(date).format('YYYY-MM-DD')
                        };

                        $http.post(api.undoPurchaseOrder, data)
                            .success(function() {
                                deferred.resolve(userOrder);
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    },
                    
                    /** 
                     * Assign Identity Card To User. 
                     * @param {object} user - User.
                     * @param {string} identityNumber - Identity number.
                     */
                    assignIdentityCardToUser: function (user, identityNumber) {
                        assert.isNotNull(user, 'user');
                        assert.isNotNull(identityNumber, 'identityNumber');

                        var deferred = $q.defer();

                        var data = {
                            UserId: user.id,
                            IdentityCard: identityNumber
                        };

                        $http.post(api.assignIdentityCardToUser, data)
                            .success(function() {
                                deferred.resolve();
                            }).error(function(response) {
                                deferred.reject(response);
                            });

                        return deferred.promise;
                    }
                };
            }
        ];

        return adminSalesApiService;
    });