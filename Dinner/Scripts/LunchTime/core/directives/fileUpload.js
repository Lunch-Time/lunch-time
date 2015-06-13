/**
 * fileUpload.
 * @file fileUpload.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define(['underscore', 'plupload', 'framework/utils'], function (_, plupload, utils) {
    'use strict';

    var fileUpload = ['config',
        function(config) {

            return {
                restrict: 'A',
                scope: {
                    uploadUrl: '@',
                    uploadParams: '=',
                    onUploadError: '&?',
                    onFilesAdded: '&?',
                    onFileUploaded: '&?',
                    onFileUploadProgress: '&?'
                },
                controller: [
                    '$scope', function($scope) {
                        this.upload = function() {
                            $scope.uploader.start();
                        };
                    }
                ],
                require: '^form',
                link: function ($scope, $element, attr, ngFormController) {
                    var options = {
                        runtimes: config.plugins.plupload.runtimes,
                        flash_swf_url: config.plugins.plupload.flash_swf_url,
                        silverlight_xap_url: config.plugins.plupload.silverlight_xap_url,
                        filters: {},
                        url: $scope.uploadUrl
                    };

                    if (attr.browseButton) {
                        options.browse_button = attr.browseButton;
                    } else {
                        var id = attr.id;
                        if (!id) {
                            id = utils.string.random(32);
                            $element.attr('id', id);
                        }
                        options.browse_button = id;
                    }

                    if (attr.maxFileSize) {
                        options.filters.max_file_size = attr.maxFileSize;
                    }

                    if (attr.mimeType) {
                        var mimeType = config.plugins.plupload.mimeTypes[attr.mimeType];
                        options.filters.mime_types = [mimeType];
                    }

                    if ($scope.uploadParams) {
                        options.multipart = true;
                        options.multipart_params = $scope.uploadParams;
                    }

                    var uploader = new plupload.Uploader(options);
                    $scope.uploader = uploader;

                    uploader.init();

                    uploader.bind('Error', function (sender, error) {
                        if ($scope.onUploadError) {
                            $scope.$apply(function () {
                                $scope.onUploadError({ error: error });
                            });                            
                        }

                        sender.refresh(); // Reposition Flash/Silverlight
                    });

                    uploader.bind('FilesAdded', function(sender, files) {
                        if ($scope.onFilesAdded) {
                            $scope.$apply(function () {
                                $scope.onFilesAdded({ files: files });
                            });                           
                        }

                        if (attr.autoUpload === 'true') {
                            uploader.start();
                        } else {
                            $scope.$apply(function () {
                                ngFormController.$setDirty();
                            });
                        }
                    });

                    uploader.bind('FileUploaded', function (sender, file, response) {
                        if ($scope.onFileUploaded) {
                            $scope.$apply(function() {
                                $scope.onFileUploaded({ file: file, response: response });
                                ngFormController.$setDirty();
                            });                            
                        }
                    });

                    uploader.bind('UploadProgress', function (sender, file) {    
                        if ($scope.onFileUploadProgress) {
                            $scope.$apply(function () {
                                $scope.onFileUploadProgress({ file: file, percent: file.percent });
                            });                           
                        }
                    });
                }
            };
        }
    ];

    return fileUpload;
});