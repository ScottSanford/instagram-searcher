angular.module("myApp",[
		'ngMessages', 
		'ngAnimate', 
	])

	.constant('VERSION', 1)
	.run(function(VERSION, $rootScope){
		$rootScope = VERSION;
	})

	.controller("InstagramSearchController", function($scope, $timeout, $q, $http) {
		
	    function wait(fn) {
	        var defer = $q.defer();
	        $timeout(fn, 2000);
	        return defer.promise;
	    };

	    function notificationMessage() {
	    	$scope.notification = true;
	    	$scope.showNotification = "Searching Instagram for photos tagged with '" + $scope.searchTerm + "'.";
	    	return wait().then(function(){
	    		$scope.showNotification = "";
	    	});
	    }


		$scope.getInstagramResults = function () {

			$scope.results = null;

			var url = "https://api.instagram.com/v1/tags/" + $scope.searchTerm + "/media/recent";
			var request = {
				callback: 'JSON_CALLBACK', 
				client_id: 'e5c725b40e6241c9aa94aa318cb50672'
			};

			$http({
				method: 'JSONP', 
				url: url, 
				params: request
			})

			.success(function(result){

				notificationMessage().then(function(){
					$scope.results = result.data;

					console.log(result.data);
			
					// var resultLength = $scope.results.length;
				
					// $scope.showNotification = "We found " + resultLength + " result" + $scope.results.length == 1 ? '' : 's for ' + $scope.searchTerm;

				});

			})
			.error(function(result){
				notificationMessage().then(function(){
					$scope.showNotification = "Oops! There was an error searching Instagram :("
				})
			})
		};


	});

	