/*jshint undef : true*/
/*globals define:true , window:true*/
define(["backbone", "app", "modules/core/core", "lodash"],

	function(Backbone, app, Core, _, d3) {
		var mainView = Backbone.View.extend({
			serialize: function() {
				return this;
			},
			initialize: function() {
				_.bindAll(this);
			},
			template: "main/main"
		});
		return new mainView();

	});