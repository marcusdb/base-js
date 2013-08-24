define(["handlebars"],

	function(Handlebars) {
		var originalCompile = Handlebars.compile;

		Handlebars.compile = function(program, options) {
			if (!options) {
				options = {
					data: true,
					stringParams: true
				};
			}

			return originalCompile.call(this, program, options);
		};

		var id = 0;
		window.actionCollection = [];

		Handlebars.registerHelper('action', function(actionName, other) {
			var options = arguments[arguments.length - 1];
			var count = window.actionCollection.length;
			window.actionCollection.push(function() {
				if ( !! other.contexts[0][actionName]) {
					other.contexts[0][actionName].call(other.contexts[0]);
				} else {
					other.contexts[0].options[actionName].call(other.contexts[0]);
				}
			});

			return new Handlebars.SafeString(options.hash.on + "='actionCollection[" + count + "]()'");
		});

		Handlebars.registerHelper('i18n', function(propertyName, view) {
			var propertyArray, replaceArray, i, result, internationalizedString, options = arguments[arguments.length - 1];

			if ( !! propertyName) {
				propertyArray = propertyName.split('.');
				if ( !! window.mobile && !! window.mobile.i18n) {
					result = window.mobile.i18n;
				} else {
					throw "i18n not defined";
				}
				for (i = 0; i < propertyArray.length; i++) {
					result = result[propertyArray[i]];
				}

				if ( !! options.hash.replace) {
					replaceArray = options.hash.replace.split(',');
					for (i = 0; i < replaceArray.length; i++) {
						result = result.replace('{' + i + '}', view.contexts[0][replaceArray[i]]);
					}
				}
			}
			if ( !! result) {
				internationalizedString = new Handlebars.SafeString(result);
			} else {
				if ( !! window.console && !! window.console.error) {
					window.console.error('Error occurred when looking for key ' + propertyName);
				}
			}
			return internationalizedString;
		});

		Handlebars.registerHelper('bind', function(propertyName) {
			var options = arguments[arguments.length - 1];
			var context = options.contexts[0];
			var _id = id;
			id++;
			context.model.on("change:" + propertyName, function() {
				context.$el.find('#bind_variable_' + _id).html(context.model.get(propertyName));
			});

			return new Handlebars.SafeString("<span type='text/x-placeholder' id='bind_variable_" + _id + "'>" + context.model.get(propertyName) + "</span>");
		});

		Handlebars.registerHelper('if', function(propertyName, options) {
			var propertyArray, i, result;
			if ( !! propertyName) {
				propertyArray = propertyName.split('.');
				if ( !! options) {
					result = options.contexts[0]; // options.contexts[0]
					// eh a view
				} else {
					throw "view not defined";
				}
				for (i = 0; i < propertyArray.length; i++) {
					result = result[propertyArray[i]];
				}
				if (typeof result === 'undefined') {
					return options.inverse(this);
				}
				if (typeof result === 'function') {
					return (result.call(options.contexts[0])) ? options.fn(this) : options.inverse(this);
				}
				if (typeof result.length !== 'undefined') {
					return ( !! result.length) ? options.fn(this) : options.inverse(this);
				}
				return ( !! result) ? options.fn(this) : options.inverse(this);

			}
			return options.inverse(this);
		});

		Handlebars.registerHelper('call', function(propertyName, options) {
			var view = options.contexts[0];
			if (typeof view[propertyName] !== 'undefined') {
				if (typeof view[propertyName] === 'function') {
					return view[propertyName].call(view);
				} else {
					return view[propertyName];
				}
			}
		});
		Handlebars.registerHelper('each', function(propertyName, options) {
			var propertyArray, i, result = "",
				viewAttribute;
			if ( !! propertyName) {
				propertyArray = propertyName.split('.');
				if ( !! options) {
					viewAttribute = options.contexts[0]; // options.contexts[0]
					// eh a view
				} else {
					throw "view not defined";
				}
				for (i = 0; i < propertyArray.length; i++) {
					try {
						viewAttribute = viewAttribute[propertyArray[i]];
					} catch (err) {
						return "";
					}
				}
				if (typeof viewAttribute.length !== 'undefined') {
					if (typeof viewAttribute === 'function') {
						viewAttribute = viewAttribute();
					}
					for (i = 0; i < viewAttribute.length; i++) {
						result += options.fn(viewAttribute[i]);
					}
				}
			}
			return result;
		});
	});