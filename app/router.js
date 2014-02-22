define([
		// Application.
		"backbone", "app", "modules/core/core"
	],

	function(Backbone, app, Core) {
		var Router, routeFunction = function(controllerName, param, param2) {
				Core.Logger.log('router', 'ROUTING: ' + controllerName + 'with params : ' + param + 'with params2 : ' + param2);
				if (controllerName.indexOf('?') > -1) {
					controllerName = controllerName.split("?")[0];
				}
				var controller = this.controllers[controllerName];
				if ( !! controller) {
					Core.Logger.log('router', 'calling initializeView for ' + controllerName);
					controller.initializeView.apply(controller, Array.prototype.slice.call(arguments, 1));
				} else {
					// TODO do something!!!!!
				}
			};
		// Defining the application router, you can attach sub routers here.
		Router = Backbone.Router.extend({
			routes: {
				"": "index",
				"/": "index"
			},
			controllers: {},
			setController: function(name, controller) {
				this.controllers[name] = controller;
			},

			initialize: function(options) {
				var main = new Backbone.Layout({
					// Attach the Layout to the main container.
					el: "#main",

					// Use the previous defined template.
					template: window.JST["app/templates/layout/main.html"]
				});
				app.Main = main;
				app.Main.render();
				this.routeFunction = routeFunction;

				this.route(":controllerName", "routeFunction");
				this.route(":controllerName/:param", "routeFunction");
				this.route(":controllerName/:param/:param2", "routeFunction");
				this.route(":controllerName/", "routeFunction");
				this.route(":controllerName/:param/", "routeFunction");
				this.route(":controllerName/:param/:param2/", "routeFunction");

				this.route(":controllerName", "routeFunction");
				this.route(":controllerName/", "routeFunction");

				this.route(":controllerName/:param", "routeFunction");
				this.route(":controllerName/:param/:param2", "routeFunction");

				this.route(":controllerName/chart/:charttype", "routeFunction");
				this.route(":controllerName/chart/:charttype/from/:dateFrom/", "routeFunction");
				this.route(":controllerName/chart/:charttype/from/:dateFrom/to/:dateTo", "routeFunction");
				this.route(":controllerName/chart/:charttype/from/:dateFrom/to/:dateTo/group/:groupVar", "routeFunction");

			},
			index: function() {

				this.navigate("main", {
					trigger: true
				});

			}
		});
		// Define your master router on the application namespace and trigger all
		// navigation from this instance.
		app.router = new Router();
		app.Router = app.router;
		return app.router;

	});