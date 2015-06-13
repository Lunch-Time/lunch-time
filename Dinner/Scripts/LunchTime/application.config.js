/**
 * Lunch Time Application Configuration.
 * @file application.config.js.
 * @copyright Copyright ©
 */
define([], function () {
    'use strict';

    var applicationUrl = '/';
    var imagesUrl = '/Images';
    var apiUrl = applicationUrl + 'Api';

    var defaultCompanyId = '1';

    return {
        defaultCompanyId: defaultCompanyId,
        urls: {
            application: applicationUrl,
            api: {
                baseUrl: apiUrl,
                courseThumbnail: apiUrl + '/coursepicture/thumbnail?companyid=' + defaultCompanyId + '&courseid={0}',
                coursePicture: apiUrl + '/coursepicture/image?companyid=' + defaultCompanyId + '&courseid={0}'
            },
            views: {
            
            },
            images: {
                images: imagesUrl,
                categoriesIcons: imagesUrl + '/CourseType/'
            }
        },
        dialogOptions: {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            dialogFade: false
            /*dialogClass: 'modal'*/
        },
        plugins: {
            plupload: {
                runtimes: 'html5,flash,silverlight,html4',
                flash_swf_url: '/scripts/Libs/plupload/Moxie.swf',
                silverlight_xap_url: '/scripts/Libs/plupload/Moxie.xap',
                mimeTypes: {
                    image: {
                        title: 'Image files',
                        extensions: 'jpg,gif,png'
                    }
                }
            },
            glisse: {
                speed: 500,
                effect: 'bounce'
            }
        }
    };
});