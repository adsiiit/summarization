var myApp = angular.module('myApp');

myApp.controller('ContentController', ['$scope', '$http', '$location', '$routeParams', 'Slug','orderByFilter','$sce',
	function($scope, $http, $location, $routeParams, Slug, orderBy, $sce){
	console.log('Content controller...');

    $scope.paragraph = ""
    $scope.summary = "Enter the text in the above Text Area."

	$scope.getSummary = function(){
        // user for testing purpose
        var text = $scope.paragraph;
		/*$http.get("https://api.aylien.com/api/v1/summarize?title="+title+"&text="+text, { headers: {"X-AYLIEN-TextAPI-Application-Key": "ecd33fd2f98861051956795b5c93f6c2", "X-AYLIEN-TextAPI-Application-ID": "fdcaa6cf"}}).success(function(response){
			$scope.summary  = response;
		});*/
        $scope.summary = "Waiting for response. . ."

        Algorithmia.client("simYl48ap8umXO8dPBtyE/7FF3O1")
                   .algo("algo://nlp/Summarizer/0.1.6")
                   .pipe(text)
                   .then(function(output) {
                    $scope.summary = output.result;
                    $scope.$applyAsync();
                     console.log(output.result);
                   });

	}

}]);









 myApp.directive('loading',   ['$http' ,function ($http)
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    elm.show();
                }else{
                    elm.hide();
                }
            });
        }
    };
}]);
