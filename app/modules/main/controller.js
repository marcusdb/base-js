/*jshint undef : true*/
/*globals define:true, window:true*/
define(["app",

		// Libs
		"backbone",

		"jquery",

		// Views
		"modules/main/view/mainView", "modules/core/core", "modules/server/server"
	],

	function(app, Backbone, $, mainView, Core, server) {
		Core.Logger.log('main.controller', 'initializing main controller');
		var MainController;
		MainController = Core.ControllerBase.extend({

			initializeView: function() {
				//Core.Logger.log(Array.prototype.slice.call(arguments));
				app.Main.setViews({
					"#content": mainView
				}).render();
			},
			destroy: function() {}


		});
		return new MainController();

	});