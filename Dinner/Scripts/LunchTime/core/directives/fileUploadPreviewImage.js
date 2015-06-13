/**
 * fileUploadPreviewImage.
 * @file fileUploadPreviewImage.js.
 * @copyright Copyright © Lunch-Time 2014
 */
define([], function() {
    'use strict';

    var fileUploadPreviewImage = [
        function() {

            return {
                restrict: 'A',                
                scope: {
                    file: '='
                },
                link: function ($scope, $element, attr) {

                    $scope.$watch('file', function (file) {
                        if (!file)
                            return;

                        var reader = new FileReader();
                        reader.onload = function(e) {
                            $element.attr('src', e.target.result);
                        };
                        reader.readAsDataURL(file.getNative());
                    });

                }
            };
        }
    ];

    return fileUploadPreviewImage;
});