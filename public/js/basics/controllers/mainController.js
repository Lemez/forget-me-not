(function(app){
    "use strict";
    app.controller("MainCtrl", [ '$scope', '$rootScope', '$window','$http','$filter',  function($scope,$rootScope, $window, $http, $filter )
        {
            $http.get('/fetch_books').success(function(data, status, headers, config){
                $scope.ages = Object.keys(data);
                $scope.books = data;
                console.log($scope.ages);
                console.log($scope.books);
               

            });
    }]);
})(PFApp);

