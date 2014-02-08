// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps : [ "main" ],

    paths : {
        // JavaScript folders.
        libs : "../vendor/bower",
        plugins : "../vendor/bower",
        vendor : "../vendor/bower",

        // Libraries.
        jquery : "../vendor/bower/jquery/jquery.min",
        lodash : "../vendor/bower/lodash/dist/lodash",
        backbone : "../vendor/bower/backbone/backbone",
        handlebars : "../vendor/bower/handlebars/handlebars",
        amplify : "../vendor/bower/amplify/lib/amplify",
        JSON : "../vendor/bower/json2/json2",
        base64 : "../vendor/bower/base64/base64",
        layoutmanager : "../vendor/bower/layoutmanager/backbone.layoutmanager",
        underscore : "../vendor/bower/underscore/underscore",
        "jquery.cookie" : "../vendor/bower/jquery.cookie/jquery.cookie"/*
                                       * ,
                                       * "jquery.wipetouch" :
                                       * "../assets/js/plugins/jquery.wipetouch",
                                       * "jquery.jqtransform" :
                                       * "../assets/js/plugins/jquery.jqtransform"
                                       */
    },

    shim : {
        // Backbone library depends on lodash and jQuery.
        backbone : {
            deps : [ "underscore", "lodash", "jquery" ],
            exports : "Backbone"
        },
        underscore : {
          exports : "_"
        },
        // Backbone library depends on lodash and jQuery.
        layoutmanager : {
            deps : [ "backbone", "underscore", "jquery" ],
            exports : "layoutmanager"
        },

        // Handlebars has no dependencies.
        handlebars : {
          exports : "Handlebars"
        },

        amplify : {
            deps : [ "jquery" ],
            exports : "amplify"
        },

        "helpers" : [ "handlebars" ]
    }
});
