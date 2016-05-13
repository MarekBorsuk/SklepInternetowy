'use strict';

var controllerNavigation = angular.module( 'controllerNavigation' , [ 'ngRoute' ] );
	

controllerNavigation.controller( 'navigation' , [ '$scope' , '$location' , function( $scope , $location ){
	
	$scope.navigation = function() {
		//testowanie wyrażenia dla admina
		if(/^\/admin/.test($location.path()))	
			return 'view/admin/navigation.html';
		else	
			return 'view/user/navigation.html';
	};

	//pozwala zwrócić aktulną ścieszkę
	//console.log($location.path());
	$scope.isActive = function ( path) {			
		return $location.path() === path;
	};

}]);


