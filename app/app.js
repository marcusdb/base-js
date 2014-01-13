define([
// Libraries.
"JSON", "jquery", "lodash", "backbone", "handlebars",

// Plugins.
"layoutmanager", "jquery.cookie" ],

function(JSON, $, _, Backbone, Handlebars, LayoutManager) {
	// Configure LayoutManager with Backbone Boilerplate defaults.
	LayoutManager.configure({
	    // Allow LayoutManager to augment Backbone.View.prototype.
	    manage : true,

	    // Indicate where templates are stored.
	    prefix : "app/templates/",
	    fetchTemplate : function(path) {
		    var done;

		    // Add the html extension.
		    path = path + ".html";

		    // If the template has not been loaded yet, then load.
		    if (!window.JST[path]) {
			    done = this.async();
			    return $.ajax({
				    url : app.root + path
			    }).then(function(contents) {
				    window.JST[path] = Handlebars.compile(contents);
				    window.JST[path].__compiled__ = true;

				    done(window.JST[path]);
			    });
		    }

		    return window.JST[path];
	    }

	});

	var app = {
		// The root path to run the application.
		root : "/"
	};

	// The application layout handles link hijacking and can be modified to
	// handle other application global actions as well.
	app.layout = new Backbone.View({
	    el : "main",

	    events : {
		    "click a[href]:not([data-bypass])" : "hijackLinks"
	    },

	    hijackLinks : function(ev) {
		    // Get the absolute anchor href.
		    var href = {
		        prop : $(this).prop("href"),
		        attr : $(this).attr("href")
		    };
		    // Get the absolute root.
		    var root = location.protocol + "//" + location.host + app.root;

		    // Ensure the root is part of the anchor href, meaning it's
		    // relative.
		    if (href.prop.slice(0, root.length) === root) {
			    // Stop the default event to ensure the link will not cause a
			    // page
			    // refresh.
			    ev.preventDefault();

			    // `Backbone.history.navigate` is sufficient for all Routers and
			    // will
			    // trigger the correct events. The Router's internal `navigate`
			    // method
			    // calls this anyways. The fragment is sliced from the root.
			    Backbone.history.navigate(href.attr, true);
		    }
	    }
	});
	return app;
});
