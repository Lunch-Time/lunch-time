/**
 * user.config.
 * @file user.config.js.
 * @copyright Copyright © Lunch-Time 2013
 */
define(['application.config', 'common/models/categories'], function (config, categories) {
    'use strict';

    var applicationUrl = '/Menu/Index';
    var apiUrl = '/Api/Menu';

    return {
        urls: {
            application: applicationUrl,
            userOrders: '/Menu/ngUserOrders',
            api: {
                getOrders: apiUrl + '/GetOrders',
                getCoursesAndOrders: apiUrl + '/GetCoursesAndOrders',
                getCourses: apiUrl + '/GetCourses',
                orderCourse: apiUrl + '/OrderCourse',
                removeOrder: apiUrl + '/RemoveOrder',
                moveOrderToBox: apiUrl + '/MoveOrderToBox',
                wishCourse: apiUrl + '/WishCourse',
                unwishCourse: apiUrl + '/UnwishCourse',
                coursePicture: config.urls.api.coursePicture,
                courseThumbnail: config.urls.api.courseThumbnail
            },
            views: {
                menuView: '/template/user/menu.tmpl',
                anonymousMenuView: '/template/user/menu/anonymous.tmpl',
                userOrdersView: '/template/user/orders.tmpl'
            }
        },
        restrictions: {
            maxBoxCount: 5,
            boxingAllowedCategories: [categories.soup, categories.meat, categories.garnish]
        }
    };
});