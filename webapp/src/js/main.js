/**
 * Created by jarias on 04/11/13.
 */
// Require.js allows us to configure shortcut alias
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        'underscore': {
            exports: '_'
        },
        'Backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'jquery': {
            exports: 'jquery'
        },
        'jquery-mobile': {
            deps: [
                'jquery'
            ],
            exports: 'jquery-mobile'
        }
    },
    paths: {
        'jquery': '../../lib/jquery/jquery',
        'jquery-mobile': '../../lib/jquery-mobile/js/jquery.mobile-1.3.2',
        'underscore': '../../lib/underscore-amd/underscore-min',
        'Backbone': '../../lib/backbone-amd/backbone',
        'text': '../../lib/requirejs-text/text'
    },
    waitSeconds: 15
});
require(['jquery'], function($){
    // Disable jQuery Mobile router
    $(document).bind("mobileinit", function () {
        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
        $.mobile.changePage.defaults.changeHash = false;
    });
});

require([
    'AppRouter',
    'utils'
],
    function (AppRouter, utils) {
        //Setup ajax requests
        utils.initAjaxSetup();
        //Initialize error handler
        utils.initErrorHandler();
        //Create Backbone Router
        window.router = new AppRouter();
        //Start Backbone Router
        Backbone.history.start();
        //Linking header back button
        $('#backButton').click(function(){
           utils.historyBack();
        });

    });