/*jshint undef : true*/
/*globals define:true , window:true*/
define(['app', 'modules/core/core', 'jquery'],

function(app, Core, $) {
	/* CODE HAZARD !!!! BE CAREFUL */
	/*
	 * Este objeto copia todos os parametros dos outros javascripts deste modulo
	 * para que eles sejam utilizados de forma unica. Alem disso ele cria um
	 * proxy para interceptar todas as chamadas verificando as regras de login
	 * antes de serem executadas. Este proxy eh utilizado para que nao seja
	 * necessario ficar reescrevendo estas regras a cada novo metodo criado.
	 */
	var proxyFunction, serverProxy, server = {}, copyObjectProperties;

	copyObjectProperties = function(server, object) {
		var propertyName, makeProxyFunction;
		makeProxyFunction = function(propertyName, object) {
			return function() {
				object[propertyName].apply(object, arguments);
			};
		};
		for (propertyName in object) {
			if (typeof object[propertyName] === 'function') {
				server[propertyName] = makeProxyFunction(propertyName, object);
			} else {
				server[propertyName] = object[propertyName];
			}
		}
	};

	/* copiando propriedades dos servers */

	//copyObjectProperties(server, redshift);

	/* Fazendo proxy para deteccao de usuarios deslogados */

	proxyFunction = function(propertyName, server) {
		return function() {
			var aArgs = arguments;

			
			server[propertyName].apply(server, aArgs);

		};
	};

	serverProxy = function(server) {
		var serverProxyResult = {};
		var propertyName;
		for (propertyName in server) {
			if (typeof server[propertyName] === 'function') {
				serverProxyResult[propertyName] = proxyFunction(propertyName, server);
			} else {
				serverProxyResult[propertyName] = server[propertyName];
			}
		}
		return serverProxyResult;
	}(server);

	return serverProxy;

});