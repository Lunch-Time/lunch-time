({
    optimize: 'uglify2',
    baseUrl: './',
    out: 'Libs.min.js',
    generateSourceMaps: false,
    preserveLicenseComments: true,
    include: [
        'angular',
        'angular-resource',
        'angular-route',
        'angular-sanitize',
        'angular-bootstrap',        
        'angular-locale',
        'angular-touch',
        'angular-infinite-scroll',
        'jquery',
        'jquery-form',
        'underscore',
        'text',
        'ladda',
        'spin',
        'moment',
        'toastr',
        'plupload',
        'glisse'],
    shim: {
        jquery: { 
            exports: 'jQuery'
        },
        underscore: {
            exports: '_'
        },
        angular: {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-bootstrap': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-locale': {
            deps: ['angular']
        },
        'angular-touch': {
            deps: ['angular']
        },
        'angular-infinite-scroll': {
            deps: ['angular', 'jquery']
        },
        ladda: {
            deps: ['jquery', 'spin']
        },
        spin: {
            deps: ['jquery']
        },
        plupload: {
            exports: 'plupload'
        },
        glisse: {
            deps: ['jquery']
        }
    },
    paths: {
        angular: '../libs/angular/angular',
        'angular-resource': '../libs/angular/angular-resource',
        'angular-route': '../libs/angular/angular-route',
        'angular-sanitize': '../libs/angular/angular-sanitize',
        'angular-locale': '../libs/angular/i18n/angular-locale_ru-ru',
        'angular-touch': '../libs/angular/angular-touch',
        'angular-bootstrap': '../libs/bootstrap/ui-bootstrap-tpls',
        'angular-infinite-scroll': '../libs/nginfinitescroll/nginfinitescroll',
        jquery: '../libs/jquery/jquery',
        'jquery-form': '../libs/jquery/jquery.form',
        underscore: '../libs/underscore/underscore',
        text: '../libs/require/text',
        ladda: '../libs/ladda/ladda',
        spin: '../libs/spin/spin',
        moment: '../libs/moment/moment',
        toastr: '../libs/toastr/toastr',
        plupload: '../libs/plupload/plupload.full.min',
        glisse: '../libs/glisse/glisse'
    }
})