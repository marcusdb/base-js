/*jshint undef : true*/
/*globals define:true*/
define([ "app", "modules/core/core", "jquery","modules/server/ajax" ], function(app, Core, $,ajax) {
	
		var  _defaultSearch,_detailedSearch;
		
		_defaultSearch = function(page,onSuccess, onError) {
			var seed;
			
			seed=Core.Session.getSearchSeed();
			
			ajax({	
				contentType:'application/json;charset=UTF-8',
				dataType: 'json',
				url: Core.Constants.SERVER_URL + '/secure/search/default/pagesize/'+Core.Constants.SEARCH_SERVER_PAGE_SIZE+'/page/'+page+'/seed/'+seed+'/json',
				xhrFields:{withCredentials:true},
				success: onSuccess,
				error: onError
			});
		};
		
		_detailedSearch=function(page,searchParam,onSuccess, onError){
			var seed;
			
			seed=Core.Session.getSearchSeed();
			
			ajax({	
				contentType:'application/json;charset=UTF-8',
				type: 'POST',
				dataType: 'json',
				processData: false,
				data: JSON.stringify(searchParam),
				url: Core.Constants.SERVER_URL + '/secure/search/detailed/pagesize/'+Core.Constants.SEARCH_SERVER_PAGE_SIZE+'/page/'+page+'/seed/'+seed+'/json',
				xhrFields:{withCredentials:true},
				success: onSuccess,
				error: onError
			});
		};
		
		
		
		return {			
			defaultSearch: function(page,onSuccess, onError) {
				_defaultSearch(page,onSuccess, onError);
			},
			detailedSearch:function(page,searchParam,onSuccess, onError){
				_detailedSearch(page,searchParam,onSuccess, onError);
			}
			
		};

});