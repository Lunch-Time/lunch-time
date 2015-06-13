/**
 * adminEditCourseController.
 * @file adminEditCourseController.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['underscore', 'angular', 'framework/class', 'framework/assert', 'framework/utils'], function(_, angular, Class, assert, utils) {
    'use strict';

    var adminEditCourseController = [
        '$scope', '$modalInstance', 'admin.config', 'adminMenuApiService', 'course', 'onSaveChange', 'dialogOptions',
        Class.create(
            /**
            * AdminEditCourseController
            * @param {object} $scope - Controller scope service.
            * @param {object} $modalInstance - Current modal dialog instance.
            * @param {object} adminConfig - Administrator configuration.
            * @param {object} adminMenuApiService - Menu API service.
            * @param {object} course - Course.
            * @param {function} onSaveChange - Save changes callback.
            * @param {object} dialogOptions - Dialog options.
            * @constructor
            */
            function ($scope, $modalInstance, adminConfig, adminMenuApiService, course, onSaveChange, dialogOptions) {
                this.$scope = utils.extend($scope, angular.copy(this.$scope), true);
                this.$modalInstance = $modalInstance;
                this.adminConfig = adminConfig;
                this.adminMenuApiService = adminMenuApiService;

                this.initialize(course, onSaveChange, dialogOptions);
            }, {
                /** Controller scope defaults. */
                $scope: {
                    course: null,
                    courseImage: {
                        url: null,
                        tempId: null
                    },
                    uploadImageUrl: null,
                    dialog: {
                        title: ''
                    },
                    state: {
                        isSavingChanges: false,
                        isUpdatingImage: false
                    }
                },

                /** Administrator configuration. */
                adminConfig: null,
                
                /** Menu API Service. */
                adminMenuApiService: null,

                /** 
                * Initialize controller. 
                * @param {object} course - Course.
                * @param {function} onSaveChanges - Save changes callback.
                * @param {object} dialogOptions - Dialog options.
                */
                initialize: function (course, onSaveChanges, dialogOptions) {
                    assert.isNotNull(course, 'course');
                    assert.isFunction(onSaveChanges, 'onSaveChanges');
                    
                    _.extend(this.$scope.dialog, dialogOptions);

                    this._onSaveChange = onSaveChanges;

                    this.$scope.course = course;
                    this.$scope.uploadImageUrl = this.adminConfig.urls.api.menu.uploadCoursePicture.format(course.id);

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
                        imageUrl = this.adminConfig.urls.api.menu.tempCoursePicture.format(tempImageId);
                    } else {
                        imageUrl = this.adminConfig.urls.api.menu.coursePicture.format(this.$scope.course.id);
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

    return adminEditCourseController;
});