/**
 * ordersEditCourseController.
 * @file ordersEditCourseController.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define(['underscore', 'framework/class', 'framework/assert', 'framework/utils'], function(_, Class, assert, utils) {
    'use strict';

    var ordersEditCourseController = [
        '$scope', '$modalInstance', 'orders.config', 'ordersMenuApiService', 'course', 'onSaveChange',
        Class.create(
            /**
            * ordersEditCourseController
            * @param {object} $scope - Controller scope service.
            * @param {object} $modalInstance - Current modal dialog instance.
            * @param {object} ordersConfig - ordersistrator configuration.
            * @param {object} ordersMenuApiService - Menu API service.
            * @param {object} course - Course.
            * @param {function} onSaveChange - Save changes callback.
            * @constructor
            */
            function ($scope, $modalInstance, ordersConfig, ordersMenuApiService, course, onSaveChange) {
                this.$scope = utils.extend($scope, this.$scope, true);
                this.$modalInstance = $modalInstance;
                this.ordersConfig = ordersConfig;
                this.ordersMenuApiService = ordersMenuApiService;

                this.initialize(course, onSaveChange);
            }, {
                /** Controller scope defaults. */
                $scope: {
                    course: null,
                    courseImage: {
                        url: null,
                        tempId: null
                    },
                    uploadImageUrl: null,
                    state: {
                        isSavingChanges: false,
                        isUpdatingImage: false
                    }
                },

                /** ordersistrator configuration. */
                ordersConfig: null,
                
                /** Menu API Service. */
                ordersMenuApiService: null,

                /** 
                * Initialize controller. 
                * @param {object} course - Course.
                * @param {function} onSaveChanges - Save changes callback.
                */
                initialize: function (course, onSaveChanges) {
                    this.$scope.courseImage = {
                        url: null,
                        tempId: null
                    };

                    this.$scope.state = {
                        isSavingChanges: false,
                        isUpdatingImage: false
                    };

                    this._onSaveChange = onSaveChanges;

                    this.$scope.course = course;
                    this.$scope.uploadImageUrl = this.ordersConfig.urls.api.uploadCoursePicture.format(course.id);

                    this.$scope.saveChanges = _.bind(this.saveChanges, this);
                    this.$scope.closeDialog = _.bind(this.closeDialog, this);

                    this.$scope.imageUploading = _.bind(this.imageUploading, this);
                    this.$scope.imageUploaded = _.bind(this.imageUploaded, this);
                    this.$scope.imageUploadFailed = _.bind(this.imageUploadFailed, this);

                    this.$scope.$watch('courseImage.tempId', _.bind(this._onCourseImageChanged, this));
                },


                /** Save changes and close dialog. */
                saveChanges: function () {
                    this.$scope.state.isSavingChanges = true;

                    var course = this.$scope.course;
                    var imageId = this.$scope.courseImage.tempId;

                    var promise = this._onSaveChange(course, imageId);

                    promise.then(_.bind(function () {
                        this.$modalInstance.close();
                    }, this));

                    promise.finally(_.bind(function () {
                        this.$scope.state.isSavingChanges = false;
                    }, this));
                },


                /** 
                 * Save changes callback.
                 * @param {object} course - Course.
                 * @param {string} imageId - Course image ID.
                 * @returns {object} promise.
                 */
                _onSaveChange: null,


                /** 
                 * On course image changed.
                 * @param {string} tempImageId - Temp image ID.
                 */
                _onCourseImageChanged: function (tempImageId) {
                    var imageUrl;

                    if (tempImageId) {
                        imageUrl = this.ordersConfig.urls.api.tempCoursePicture.format(tempImageId);
                    } else {
                        imageUrl = this.ordersConfig.urls.api.coursePicture.format(this.$scope.course.id);
                    } 

                    this.$scope.courseImage.url = imageUrl;
                },
                    

                /** 
                 * Image uploading started.
                 * @param {array} files - Files.
                 */
                imageUploading: function (files) {
                    this.$scope.state.isUpdatingImage = true;
                },          
                

                /** Image uploading failed. */
                imageUploadFailed: function () {
                    this.$scope.state.isUpdatingImage = false;
                },    
                

                /** 
                 * Image uploaded.
                 * @param {array} files - Files.
                 * @param {object} response - Response.
                 */
                imageUploaded: function (files, response) {
                    this.$scope.state.isUpdatingImage = false;

                    var uploadedImages = JSON.parse(response.response);
                    if (uploadedImages && uploadedImages.length > 0) {
                        this.$scope.courseImage.tempId = uploadedImages[0];
                    }
                },


                /** Discard changes and close dialog */
                closeDialog: function () {
                    this.$modalInstance.dismiss();
                }
            })
    ];

    return ordersEditCourseController;
});