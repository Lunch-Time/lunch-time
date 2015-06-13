/**
 * admin.config.
 * @file admin.config.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['application.config'], function (config) {
    'use strict';

    var applicationUrl = '/Admin/Index';
    var adminApiUrl = config.urls.api.baseUrl + '/Admin';
    var ordersApiUrl = config.urls.api.baseUrl + '/Orders';

    var viewsUrl = applicationUrl + '/View';

    return {
        urls: {
            application: applicationUrl,
            sales: '/Orders/Sales',
            api: {
                menu: {
                    getMenuAndCourses: adminApiUrl + '/GetMenuAndCourses',
                    removeCourseFromMenu: adminApiUrl + '/RemoveCourseFromMenu',
                    createCourse: adminApiUrl + '/CreateCourse',
                    updateCourse: adminApiUrl + '/UpdateCourse',
                    removeCourse: adminApiUrl + '/RemoveCourse',
                    changeCourseMaxOrders: adminApiUrl + '/ChangeMaxOrders',
                    addCourseToMenu: adminApiUrl + '/AddCourseToMenu',
                    tempCoursePicture: config.urls.api.baseUrl + '/coursepicture/image?tempname={0}',
                    coursePicture: config.urls.api.coursePicture,
                    courseThumbnail: config.urls.api.courseThumbnail,
                    uploadCoursePicture: config.urls.api.baseUrl + '/coursepicture/image?companyid=' + config.defaultCompanyId + '&courseid={0}'
                },
                sales: {
                    getUsersOrders: ordersApiUrl + '/GetUsersOrders',
                    purchaseOrder: ordersApiUrl + '/PurchaseOrder',
                    undoPurchaseOrder: ordersApiUrl + '/UndoPurchaseOrder',
                    removeOrder: ordersApiUrl + '/RemoveOrder',
                    assignIdentityCardToUser: ordersApiUrl + '/AssignIdentityCardToUser'
                }
            },
            views: {
                menuView: '/template/admin/menu.tmpl',
                salesView: '/template/admin/sales.tmpl'
            }
        }
    };
});