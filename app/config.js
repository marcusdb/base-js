// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps : [ "main" ],

    paths : {
        // JavaScript folders.
        libs : "../bower_components",
        plugins : "../bower_components",
        vendor : "../bower_components",

        // Libraries.
        jquery : "../bower_components/jquery/jquery.min",
        lodash : "../bower_components/lodash/dist/lodash",
        backbone : "../bower_components/backbone/backbone",
        handlebars : "../bower_components/handlebars/handlebars",
        amplify : "../bower_components/amplify/lib/amplify",
        JSON : "../bower_components/json2/json2",
        base64 : "../bower_components/base64/base64",
        layoutmanager : "../bower_components/layoutmanager/backbone.layoutmanager",
        underscore : "../bower_components/underscore/underscore",
        "jquery.cookie" : "../bower_components/jquery.cookie/jquery.cookie"/*
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
