angular.module("myApp",[
		'ngMessages', 
		'ngAnimate', 
	])

	.controller("InstagramSearchCtrl", function($scope, $timeout, $q, $http) {

	    function wait() {

	        var defer = $q.defer();

	        $timeout(function(){
	        	defer.resolve();}, 500);

	        return defer.promise;
	    };



	    $scope.searchInstagram = function() {

	    	$scope.errorMessage = false;

	    	if ($scope.instaSearcher.$valid) {

	    		$scope.errorMessage = true;

	    		var term = $scope.searchTerm;

	    		notificationMessage();
		    	getInstagramResults(term);
	    		
	    	}
	    }

	    function notificationMessage() {

	    	var term = $scope.searchTerm;

	    	$scope.notification = true;

	    	$scope.showNotification = "Searching Instagram for photos tagged with '" + term + "'";

	    	return wait().then(function(){
	    		$scope.showNotification = "";
	    	});

	    }

		function getInstagramResults(term) {


			var url = "https://api.instagram.com/v1/tags/" + term + "/media/recent";

			var request = {
				callback: 'JSON_CALLBACK', 
				client_id: 'e5c725b40e6241c9aa94aa318cb50672', 
				count: 30
			};

			$http({
				method: 'JSONP', 
				url: url, 
				params: request
			})

			.success(function(result){

				notificationMessage().then(function(){


					$scope.searchTerm = '';

					$scope.results = result.data;
				
					$scope.showNotification = "We found " + $scope.results.length + " result" + ($scope.results.length == 1 ? '' : 's') +  " for '" + term + "'";

				});

			})

			.error(function(result){
				notificationMessage().then(function(){
					$scope.showNotification = "Oops! There was an error searching Instagram :(";
				})
			})
		};


	});

	