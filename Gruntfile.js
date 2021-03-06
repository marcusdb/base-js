// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
module.exports = function(grunt) {
  grunt.task.loadNpmTasks("grunt-contrib");
  grunt.task.loadNpmTasks("grunt-bbb-styles");
  grunt.task.loadNpmTasks("grunt-bbb-server");


  grunt.initConfig({

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: ["dist/"],


    // The jshint option for scripturl is set to lax, because the anchor
    // override inside main.js needs to test for them so as to not accidentally
    // route.
    jshint: {
      options: {
        scripturl: true
      },
      files: [
        "build/config.js", "app/**/*.js"
      ]
    },


    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.  It's named
    // dist/debug/require.js, because we want to only load one script file in
    // index.html.
    concat: {
      dist: {
        src: [
          "assets/js/libs/almond.js",
          "dist/debug/require.js",
          "dist/debug/templates.js"

        ],

        dest: "dist/debug/require.js",

        separator: ";"
      }
    },



    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    cssmin: {
      "dist/release/index.css": [
        "dist/debug/index.css"
      ]
    },

    // This task simplifies working with CSS 
    // Instead of manually specifying your stylesheets inside the
    // configuration, you can use `@imports` and this task will concatenate
    // only those paths.
    styles: {
      // Out the concatenated contents of the following styles into the below
      // development file path.
      "dist/debug/index.css": {
        // Point this to where your `index.css` file is location.
        src: "assets/css/index.css",

        // The relative path to use for the @imports.
        paths: ["assets/css"],

        // Additional production-only stylesheets here.
        additional: []
      }
    },

    // Takes the built require.js file and minifies it for filesize benefits.
    uglify: {
      "dist/release/require.js": [
        "dist/debug/require.js"
      ]
    },

    // Running the server without specifying an action will run the defaults,
    // port: 8000 and host: 127.0.0.1.  If you would like to change these
    // defaults, simply add in the properties `port` and `host` respectively.
    // Alternatively you can omit the port and host properties and the server
    // task will instead default to process.env.PORT or process.env.HOST.
    //
    // Changing the defaults might look something like this:
    //
    // server: {
    //   host: "127.0.0.1", port: 9001
    //   debug: { ... can set host and port here too ...
    //  }
    //
    //  To learn more about using the server task, please refer to the code
    //  until documentation has been written.
    server: {
      // Ensure the favicon is mapped correctly.
      files: {
        "favicon.ico": "favicon.ico"
      },

      debug: {
        // Ensure the favicon is mapped correctly.
        files: "<config:server.files>",

        // Map `server:debug` to `debug` folders.
        folders: {
          "app": "dist/debug",
          "assets/js/libs": "dist/debug",
          "assets/css": "dist/debug"
        }
      },

      release: {
        // This makes it easier for deploying, by defaulting to any IP.
        host: "0.0.0.0",

        // Ensure the favicon is mapped correctly.
        files: "<config:server.files>",

        // Map `server:release` to `release` folders.
        folders: {
          "app": "dist/release",
          "assets/js/libs": "dist/release",
          "assets/css": "dist/release"
        }
      }
    },

    // This task uses James Burke's excellent r.js AMD build tool.  In the
    // future other builders may be contributed as drop-in alternatives.
    requirejs: {
      compile: {
        options: {
          // Include the main configuration file.
          mainConfigFile: "app/config.js",

          // Output file.
          out: "dist/debug/require.js",

          // Root application module.
          name: "config",
          optimize: "none",

          // Do not wrap everything in an IIFE.
          wrap: false
        }
      },

    },

    // The headless QUnit testing environment is provided for "free" by Grunt.
    // Simply point the configuration to your test directory.
    qunit: {
      all: ["test/qunit/*.html"]
    },

    // The headless Jasmine testing is provided by grunt-jasmine-task. Simply
    // point the configuration to your test directory.
    jasmine: {
      all: ["test/jasmine/*.html"]
    },

    // The watch task can be used to monitor the filesystem and execute
    // specific tasks when files are modified.  By default, the watch task is
    // available to compile CSS if you are unable to use the runtime compiler
    // (use if you have a custom server, PhoneGap, Adobe Air, etc.)
    watch: {
      files: ["app/**/*"],
      tasks: "debug"
    },

    // The handlebars task compiles all application templates into JavaScript
    // functions using Handlebars templating engine.
    //
    // Since this task defaults to writing to the same file as the jst task,
    // edit the debug task replacing jst with handlebars.
    //
    // The concat task depends on this file to exist, so if you decide to
    // remove this, ensure concat is updated accordingly.
    handlebars: {

      built: {
        src: ['app/templates/**/*.html'],
        dest: 'dist/debug/templates.js',
        options: {
          compilerOptions: {
            data: true,
            stringParams: true
          }
        }
      }

    },

  });



  // The debug task will remove all contents inside the dist/ folder, lint
  // all your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.
  grunt.registerTask("debug", ["clean", "jshint", "requirejs", "handlebars", "concat", "styles"]);

  // The release task will run the debug tasks and then minify the
  // dist/debug/require.js file and CSS files.
  grunt.registerTask("release", ["debug", "uglify", "cssmin"]);



  //filename conversion for templates
  var defaultProcessName = function(name) {
    return name;
  };

  // filename conversion for partials
  var defaultProcessPartialName = function(filePath) {
    var pieces = _.last(filePath.split("/")).split(".");
    var name = _(pieces).without(_.last(pieces)).join("."); // strips file extension
    return name.substr(1, name.length); // strips leading _ character
  };

  var escapeQuote = function(name) {
    return name.replace("'", "\\'");
  };

  var _ = grunt.util._;


};