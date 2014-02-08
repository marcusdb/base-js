/*jshint undef : true*/
/*globals define:true , window:true*/
define(["backbone", "app", "modules/core/core", "lodash"],

	function(Backbone, app, Core, _, d3) {
		var mainView = Backbone.View.extend({
			className: "row",
			serialize: function() {

				return this;
			},
			initialize: function() {
				_.bindAll(this);
			},
			template: "main/main",
			generateChart: function(model) {
//this.insertView(new LineChartView({model: model})).render();
			}
		});
		return new mainView();

	});