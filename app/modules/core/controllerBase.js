/*jshint undef : true*/
/*globals define:true*/
define(["app","backbone"],

function(app,Backbone) {
	var ControllerBase = Backbone.Model.extend({
		initializeView: function() {
			throw "abstract";
		}
	});

	return ControllerBase;
});