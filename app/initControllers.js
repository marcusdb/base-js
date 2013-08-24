define([
	// Application.
	"app", "modules/main/controller"
],

function(app, mainController) {

	app.router.setController("main", mainController);
	
});