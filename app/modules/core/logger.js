/*jshint undef : true*/
/*globals define:true , window: true*/
define(["app"],

function(app) {
	

	var Logger = {
		ENABLEALL: true,
		log: function(topic,content) {

			if(window.console && ( !! Logger.ENABLEALL || ( !! topic && !! Logger.enable && Logger.enable[topic]))) {

				window.console.log(content);


			}
		}
	};

	if(window.console) {
		Logger.error = window.console.error;
	} else {
		Logger.error = function(){};
	}
	return Logger;
});