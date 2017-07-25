PFApp.factory('getService', ['$http' function($http) {

	getService.get() = function(){
			$http.get('/fetch_images').success(function(data) {
				return data;
		});
	}

	return getService;	
			
}]);