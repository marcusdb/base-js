// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../assets/vendor",

    // Libraries.
    jquery: "../assets/js/libs/jquery",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    handlebars: "../assets/js/libs/handlebars-1.0.0.beta.6",
    amplify: "../assets/js/libs/amplify",
    JSON: "../assets/js/libs/json2",
    d3: "../assets/js/libs/d3.v3",
    bootstrap:"../assets/js/libs/bootstrap"


  },

  shim: {
    bootstrap:{
      exports: 'bootstrap'
    },
    d3: {
      exports: 'd3'
    },

    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    // Handlebars has no dependencies.
    handlebars: {
      exports: "Handlebars"
    },

    amplify: {
      deps: ["jquery"],
      exports: "amplify"
    },

    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"],
    "helpers": ["handlebars"]


  }

});