/*jshint undef : true*/
/*globals define:true*/
define([ // LIB
	"amplify",

	"app", "modules/core/logger", "modules/core/ControllerBase", "modules/core/constants"
],

function(Amplify, app, logger, ControllerBase, Constants) {
	var core = {};
	core.Logger = logger;
	core.ControllerBase = ControllerBase;
	core.Amplify = Amplify;
	core.Constants = Constants;

	if (typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}

	return core;

});