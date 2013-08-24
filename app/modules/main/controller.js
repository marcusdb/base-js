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

			initializeView: function(chartType, dateFrom, dateTo, groupBy) {
				Core.Logger.log(Array.prototype.slice.call(arguments));
				switch (chartType) {
					case "pmc":
						server.getPMCGroupBy(dateFrom, dateTo, groupBy, this._processData);
						break;
					case "reg":
						server.getREGGroupBy(dateFrom, dateTo, groupBy, this._processData);
						break;
					case "fts":
						server.getFTSGroupBy(dateFrom, dateTo, groupBy, this._processData);
						break;
				}


				app.Main.setViews({
					"#content": mainView
				}).render();
			},
			destroy: function() {},
			_processData: function(data) {
				var finalData = [];
				var groupMapper = {};
				var groupName;
				var prop, sortByDate;
				var models = [];
				var aux;
				for (prop in data) {
					if (prop !== 'datedt') {
						if (prop !== 'total') {
							groupName = prop;
						}
					}
				}
				for (prop in data) {
					for (var i = 0; i < data[prop].length; i++) {
						if (typeof finalData[i] === 'undefined') {
							finalData.push({});
						}
						finalData[i][prop] = data[prop][i];
					}
				}

				finalData.forEach(function(d) {
					d.datedt = new Date(d.datedt);
					d.total = +d.total;
					if (!groupMapper.hasOwnProperty(d[groupName])) {
						groupMapper[d[groupName]] = [];
					}
					groupMapper[d[groupName]].push(d);
				});

				// aux = function(d) {
				//d.datedt = new Date(d.datedt);

				//d.total = +d.total;

				// };
				sortByDate = function(a, b) {
					return a.datedt - b.datedt;
				};

				for (prop in groupMapper) {
					var model;
					//groupMapper[prop].forEach(aux);
					groupMapper[prop] = groupMapper[prop].sort(sortByDate);

					model = new Backbone.Model({
						data: groupMapper[prop],
						label: prop
					});

					models.push(model);
					mainView.generateChart(model);

				}
				server.getCatalog(groupName, function(data) {
					models.forEach(function(model) {
						model.set('label', data[model.get('label')]);
					});

				});


				Core.Logger.log('main.controller', '_processData called');
				Core.Logger.log('main.controller', data);
				Core.Logger.log('main.controller', finalData);
			}


		});
		return new MainController();

	});