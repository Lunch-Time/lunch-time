/**
 * orders.config.
 * @file orders.config.js.
 * @copyright Copyright © InterMedia RUS 2013
 */
define(['application.config'], function (config) {
    'use strict';

    var applicationUrl = '/orders/sales';
    var apiUrl = '/Api/orders';
    var viewsUrl = applicationUrl + '/View';

    var defaultCompanyId = '1';

    return {
        urls: {
            application: applicationUrl,
            api: {
                getMenuAndCourses: apiUrl + '/GetMenuAndCourses',
                removeCourseFromMenu: apiUrl + '/RemoveCourseFromMenu',
                createCourse: apiUrl + '/CreateCourse',
                updateCourse: apiUrl + '/UpdateCourse',
                removeCourse: apiUrl + '/RemoveCourse',
                changeCourseMaxOrders: apiUrl + '/ChangeMaxOrders',
                addCourseToMenu: apiUrl + '/AddCourseToMenu',
                tempCoursePicture: '/Api/coursepicture/image?tempname={0}',
                coursePicture: '/Api/coursepicture/image?companyid=' + defaultCompanyId + '&courseid={0}',
                uploadCoursePicture: '/Api/coursepicture/image?companyid=' + defaultCompanyId + '&courseid={0}'
            },
            views: {
                menuView: '/template/orders/menu.tmpl'
            }
        }
    };
});