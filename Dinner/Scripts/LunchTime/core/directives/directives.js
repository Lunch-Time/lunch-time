/**
 * directives.
 * @file directives.js.
 * @copyright Copyright ©
 */
define([
        'angular',
        'core/directives/isLoading',
        'core/directives/toggle',
        'core/directives/fileUpload',
        'core/directives/fileUploadPreviewImage',
        'core/directives/popoverHtml',
        'core/directives/popoverHtmlPopup',
        'core/directives/srcBig'
    ],
    function (angular, isLoading, toggle, fileUpload, fileUploadPreviewImage, popoverHtml, popoverHtmlPopup, srcBig) {
        'use strict';

        var dependencies = ['ui.bootstrap'];
        var directives = angular.module('lunchtime.core.directives', dependencies);
        directives.directive('isLoading', isLoading);
        directives.directive('toggle', toggle);
        directives.directive('fileUpload', fileUpload);
        directives.directive('fileUploadPreviewImage', fileUploadPreviewImage);
        directives.directive('popoverHtml', popoverHtml);
        directives.directive('popoverHtmlPopup', popoverHtmlPopup);
        directives.directive('srcBig', srcBig);

        return directives;
    });