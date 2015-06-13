/**
 * adminSalesUsersOrdersController.
 * @file adminSalesUsersOrdersController.js.
 * @copyright Copyright © Lunch-Time 2014
 */

define(
    [
        'underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils',
        'admin/sales/models/activeUserOrder'
    ],
    function(_, angular, Class, assert, utils, ActiveUserOrder) {
        'use strict';

        var viewStates = {
            userOrder: 'user-order',
            usersOrders: 'users-orders'
        };

        var adminSalesUsersOrdersController = [
            '$scope', '$modal', 'config', 'adminSalesService', 'adminSalesCardReaderService',
            Class.create(
                /**
                * AdminSalesUsersOrdersController
                * @param {object} $scope - Controller scope service.
                * @param {object} $modal - Modal service.
                * @param {object} config - Application config.
                * @param {object} adminSalesService - Admin sales service.
                * @param {object} adminSalesCardReaderService - Admin sales card reader service.
                * @constructor
                */
                function($scope, $modal, config, adminSalesService, adminSalesCardReaderService) {
                    this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                    this.$modal = $modal;
                    this.config = config;
                    this.adminSalesService = adminSalesService;
                    this.adminSalesCardReaderService = adminSalesCardReaderService;

                    this.initialize();
                }, {
                    /** Controller scope defaults. */
                    $scope: {
                        date: null,
                        salesStats: null,
                        usersOrders: [],
                        purchasedUsersOrders: [],
                        notPurchasedUsersOrders: [],
                        activeUserOrder: null,
                        viewState: viewStates.usersOrders
                    },                  

                    /** Modal service. */
                    $modal: null,

                    /** Application config. */
                    config: null,

                    /** Admin sales service. */
                    adminSalesService: null,

                    /** Admin sales card reader service */
                    adminSalesCardReaderService: null,

                    /** Active modal dialog. */
                    activeModal: null,

                    /** 
                    * Initialize controller. 
                    */
                    initialize: function() {
                        this.$scope.viewUserOrder = _.bind(this.viewUserOrder, this);

                        this.$scope.purchaseOrder = _.bind(this.purchaseOrder, this);
                        this.$scope.undoPurchaseOrder = _.bind(this.undoPurchaseOrder, this);
                        this.$scope.closeActiveUserOrder = _.bind(this.closeActiveUserOrder, this);
                        
                        this.$scope.$watch('usersOrders', _.bind(this.onOrdersChanged, this), true);
                        this.$scope.$watch('activeUserOrder', _.bind(this.onActiveUserOrderChanged, this));

                        this.adminSalesCardReaderService.onInput(_.bind(this.onCardReaderInput, this));
                    },


                    /** 
                     * Orders changed handler.
                     * @param {array} usersOrders - Users orders.
                     */
                    onOrdersChanged: function (usersOrders) {
                        this.$scope.salesStats = this.adminSalesService.getSalesStats(usersOrders);

                        this.$scope.purchasedUsersOrders = this.adminSalesService.getPurchasedUsersOrders(usersOrders);
                        this.$scope.notPurchasedUsersOrders = this.adminSalesService.getNotPurchasedUsersOrders(usersOrders);
                    },


                    /** 
                     * Active user order changed handler.
                     * @param {array} activeUserOrder - Active user order.
                     */
                    onActiveUserOrderChanged: function (activeUserOrder) {
                        if (!!activeUserOrder) {
                            this.$scope.viewState = viewStates.userOrder;
                        } else {
                            this.$scope.viewState = viewStates.usersOrders;
                        }
                    },


                    /** 
                     * Purchase order.
                     * @param {object} userOrder - User order.
                     */
                    purchaseOrder: function (userOrder) {
                        assert.isNotNull(userOrder, 'userOrder');

                        return this.$scope.onPurchaseOrder({ userOrder: userOrder });
                    },


                    /** 
                     * Undo purchase order.
                     * @param {object} userOrder - User order.
                     */
                    undoPurchaseOrder: function (userOrder) {
                        assert.isNotNull(userOrder, 'userOrder');

                        return this.$scope.onUndoPurchaseOrder({ userOrder: userOrder });
                    },


                    /** Close active user order */
                    closeActiveUserOrder: function() {
                        this.$scope.activeUserOrder = null;
                    },


                    /** 
                     * Card reader input handler.
                     * @param {object} event - Event.
                     * @param {string} input - Card reader input.
                     */
                    onCardReaderInput: function(event, input) {
                        assert.isNotNull(input, 'input');

                        var identityNumber = this.adminSalesService.convertToIdentityNumber(input);

                        var userOrder = this.adminSalesService.getUserOrderByIdentityNumber(this.$scope.usersOrders, identityNumber);

                        if (!!userOrder) {

                            if (userOrder.orders.length > 0) {

                                var onOrderPurchased = function() {
                                    this.$scope.activeUserOrder = new ActiveUserOrder(userOrder, true);
                                };
                                if (!userOrder.isPurchased) {
                                    this.$scope.onPurchaseOrder({ userOrder: userOrder }).then(_.bind(onOrderPurchased, this));
                                } else {
                                    this.$scope.activeUserOrder = new ActiveUserOrder(userOrder, true);
                                }

                            } else {
                                this.viewUserOrderNotFound(userOrder.user);
                            }

                        } else {
                            this.viewUnknownUserIdentityNumber(identityNumber);
                        }
                    },


                    /** 
                     * View user order.
                     * @param {object} userOrder - User order.
                     */
                    viewUserOrder: function(userOrder) {
                        assert.isNotNull(userOrder, 'userOrder');

                        this.$scope.activeUserOrder = new ActiveUserOrder(userOrder, false);
                    },


                    /** 
                     * View user order not found. 
                     * @param {object} user - User.
                     */
                    viewUserOrderNotFound: function(user) {
                        assert.isNotNull(user, 'user');

                        var dialogOptions = _.extend({}, this.config.dialogOptions, {
                            templateUrl: '/template/admin/sales/user-order/not-found.tmpl',
                            controller: 'confirmController',
                            resolve: {
                                data: function() {
                                    return {
                                        user: user
                                    };
                                }
                            }
                        });

                        this.dismissActiveModal();
                        this.activeModal = this.$modal.open(dialogOptions);
                    },


                    /** 
                     * View unknown user identity number. 
                     * @param {string} identityNumber - Identity number.
                     */
                    viewUnknownUserIdentityNumber: function(identityNumber) {
                        assert.isNotNull(identityNumber, 'identityNumber');

                        var onRegisterIdentityCard = function() {
                            this.registerIdentityCard(identityNumber);
                        };

                        var dialogOptions = _.extend({}, this.config.dialogOptions, {
                            templateUrl: '/template/admin/sales/unknown-identity-number.tmpl',
                            controller: 'confirmController',
                            resolve: {
                                data: function() {
                                    return {
                                        identityNumber: identityNumber
                                    };
                                }
                            }
                        });

                        this.dismissActiveModal();
                        var modal = this.$modal.open(dialogOptions);
                        this.activeModal = modal;

                        modal.result.then(_.bind(onRegisterIdentityCard, this));
                    },

                    /** 
                     * Register identity card.
                     * @param {string} identityNumber - Identity number.
                      */
                    registerIdentityCard: function (identityNumber) {
                        assert.isNotNull(identityNumber, 'identityNumber');

                        var onIdentityCardRegistered = function(user) {
                            assert.isNotNull(user, 'user');
                            user.identityNumber = identityNumber;
                        };

                        var users = _.map(this.$scope.usersOrders, function(userOrder) {
                            return userOrder.user;
                        });

                        var dialogOptions = _.extend({}, this.config.dialogOptions, {
                            templateUrl: '/template/admin/sales/register-identity-card.tmpl',
                            controller: 'adminSalesRegisterIdentityCardController',
                            resolve: {
                                users: function() {
                                    return users;
                                },
                                identityNumber: function () {
                                    return identityNumber;
                                }
                            }
                        });

                        var modal = this.$modal.open(dialogOptions);
                        modal.result.then(_.bind(onIdentityCardRegistered, this));
                    },


                    /** Dismiss active modal. */
                    dismissActiveModal: function() {
                        if (this.activeModal) {
                            try {
                                this.activeModal.dismiss();
                            } catch (e) {
                            } finally {
                                this.activeModal = null;
                            }


                        }
                    }
                })
        ];

        return adminSalesUsersOrdersController;
    });