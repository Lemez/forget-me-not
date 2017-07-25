var PFApp = angular.module('MyApp',[
	// 'MyApp.services',
	// 'angularFileUpload',
	// 'ngProgress'
	// 'ngRoute',
	// 'angularModalService'
	]);

PFApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];   
	}]).run(function($rootScope, $http) {
		    $rootScope.count = {
		    	type:{},
				place:{},
				category:{}
			};

			// $http.get('/fetch_images').success(function(data, status, headers, config){
				
			// 		$rootScope.images = [];
			// 		$rootScope.lookup={};

			// 		// capitalise strings
			// 		for (var i = 0; i<data.length;i++){
			// 			var current = data[i];
			// 			current.front_end_id=i;

			// 			if (current.author==="Firstname Lastname"){
			// 				current.author="";
			// 			}

			// 			if (current.author.length>0 && current.author!=="Firstname Lastname"){
   //                             current.hasAuthor = true;
   //                             current.authorTooltip = "Photograph by: " + current.author;
   //                      } else {
   //                             current.hasAuthor = false;
   //                             current.authorTooltip = "Free To Use";
   //                      }
	
	  //                   Object.keys(current).forEach(function(prop){
	  //                       var val = current[prop];
	  //                       var type = typeof(val);
	  //                       if (type ==='string') {
	  //                           current[prop] = val.charAt(0).toUpperCase() + val.substr(1); 
	  //                       } else if (val instanceof Array) {
	  //                           var capitalized_tags=[];
	  //                           val.forEach(function(tag){
	  //                               tag = tag.trim();
	  //                               capitalized_tags.push(tag.charAt(0).toUpperCase() + tag.substr(1));
	  //                           });
	  //                            current[prop] = capitalized_tags;
	  //                       }
	  //                   });

	  //                   $rootScope.images.push(current);
	  //                   $rootScope.lookup[i]=current;
	  //               }

	  //               // call main page
			// 		$rootScope.$broadcast('API-loaded'); 
					
			// }).error(function(data, status, headers, config) {
		 //    	alert('error getting data');
		 //  	});

});   

// angular.module('ngm.ngDrive')
// 	.provider('OauthService', ngDrive.Config)
// 	.config(function (OauthServiceProvider) {
// 		OauthServiceProvider.setScopes('https://www.googleapis.com/auth/drive.file');
// 		OauthServiceProvider.setClientID('452925651630-egr1f18o96acjjvphpbbd1qlsevkho1d.apps.googleusercontent.com');
// 		OauthServiceProvider.setTokenRefreshPolicy(ngDrive.TokenRefreshPolicy.ON_DEMAND);
// 	});
	