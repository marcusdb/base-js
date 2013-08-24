define(["app", "modules/core/core", "jquery"], function(app, Core, $) {

	return function(params) {

		var successFunc = params.success,
			errorFunc = params.error;

		params.error = function(error) {
			var errorStatus = window.parseInt(error.status);
			//Core.ButtonsView.showButtons();
			if (errorStatus > 616 && errorStatus < 624) {
				Core.Session.clearStorage();
				$.cookie(Core.Constants.AUTOLOGIN_TOKEN, null, {
					path: '/'
				});
				$.cookie(Core.Constants.AUTHENTICATION_TOKEN, null, {
					path: '/'
				});
				app.Router.navigate("login", {
					trigger: true
				});
			} else {
				errorFunc(error);
			}
		};

		params.success = function(data) {
			//Core.ButtonsView.showButtons();
			successFunc(data);
		};

		//Core.ButtonsView.hideButtons();
		$.ajax(params);
	};

});