/**
 * adminSalesRegisterIdentityCardController.
 * @file adminSalesRegisterIdentityCardController.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils', 'toastr'], function(_, angular, Class, assert, utils, toastr) {
    'use strict';

    var adminSalesRegisterIdentityCardController = [
        '$scope', '$modal', 'adminSalesApiService', 'config', '$modalInstance', 'users', 'identityNumber',
        Class.create(
            /**
            * Admin Sales Register Identity Card Controller.
            * @param {object} $scope - Controller scope service.
            * @param {object} $modal - Modal service.
            * @param {object} adminSalesApiService - Admin sales API service.
            * @param {object} config - Application configuration.
            * @param {object} $modalInstance - Modal instance.
            * @param {array} users - Users.
            * @param {string} identityNumber - identityNumber.
            * @constructor
            */
            function($scope, $modal, adminSalesApiService, config, $modalInstance, users, identityNumber) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.$modal = $modal;
                this.adminSalesApiService = adminSalesApiService;
                this.config = config;
                this.$modalInstance = $modalInstance;

                this.initialize(users, identityNumber);
            }, {
                /** Controller scope defaults. */
                $scope: {
                    users: [],
                    state: {
                        isSavingChanges: null
                    }
                },

                /** Modal service. */
                $modal: null,

                /** Admin sales API service. */
                adminSalesApiService: null,

                /** Application configuration. */
                config: null,

                /** Current modal dialog instance */
                $modalInstance: null,

                /** Users. */
                users: [],

                /** Identity number. */
                identityNumber: null,

                /** 
                * Initialize controller. 
                * @param {array} users - Users.
                * @param {string} identityNumber - Identity number.
                */
                initialize: function(users, identityNumber) {
                    assert.isNotNull(users, 'users');
                    assert.isNotNull(identityNumber, 'identityNumber');

                    this.users = users;
                    this.identityNumber = identityNumber;

                    this.$scope.users = users;
                    this.$scope.state = {
                        isSavingChanges: false
                    };

                    this.$scope.assignIdentityCardToUser = _.bind(this.assignIdentityCardToUser, this);
                    this.$scope.closeDialog = _.bind(this.closeDialog, this);
                },

                assignIdentityCardToUser: function(user) {
                    assert.isNotNull(user, 'user');

                    var onAssigned = function () {
                        toastr.success('Карточка зарегистрирована!');
                        this.$modalInstance.close(user);
                    };

                    var onAssignFailed = function() {
                        this.$scope.state.isSavingChanges = false;
                        toastr.error('Не удалось зарегистрировать карточку.', 'Ошибка!');
                    };

                    var onConfirmed = function () {
                        this.$scope.state.isSavingChanges = true;
                        this.adminSalesApiService.assignIdentityCardToUser(user, this.identityNumber).then(_.bind(onAssigned, this), _.bind(onAssignFailed, this));
                    };
                    
                    this.confirmRegisterIdentityCard(user).then(_.bind(onConfirmed, this));
                },

                confirmRegisterIdentityCard: function(user) {
                    assert.isNotNull(user, 'user');

                    var dialogOptions = _.extend({}, this.config.dialogOptions, {
                        templateUrl: '/template/admin/sales/confirm-register-identity-card.tmpl',
                        controller: 'confirmController',
                        resolve: {
                            data: function() {
                                return {
                                    user: user
                                };
                            }
                        }
                    });

                    return this.$modal.open(dialogOptions).result;
                },

                /** Discard changes and close dialog */
                closeDialog: function() {
                    this.$modalInstance.dismiss();
                }
            })
    ];

    return adminSalesRegisterIdentityCardController;
});