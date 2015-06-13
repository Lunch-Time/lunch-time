/**
 * controllers.
 * @file controllers.js.
 * @copyright Copyright ©
 */
define(['angular', 'core/controllers/confirmController'], function (angular, confirmController) {
    'use strict';

    var dependencies = [];
    var controllers = angular.module('lunchtime.core.controllers', dependencies);
    controllers.controller('confirmController', confirmController);

    return controllers;
});