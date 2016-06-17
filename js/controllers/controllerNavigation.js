'use strict';

var controllerNavigation = angular.module( 'controllerNavigation' , [ 'ngRoute' ] );
	

controllerNavigation.controller( 'navigation' , [ '$scope' , '$location' ,'cartServices', 'checkToken', function( $scope , $location, cartServices, checkToken ){
	

	$scope.navigation = function() {
		//testowanie wyrażenia dla admina		

		if(/^\/admin/.test($location.path())){

			if(!checkToken.isAdmin()){	
				
				window.location.href = '#/products?alert=noAdmin';
				//$location.path('/products');

			}	

			return 'view/admin/navigation.html';		
		}	
			
		else{	
			if($location.search().alert == 'noAdmin'){
				$scope.noAdmin = true;
			}else{
				$scope.noAdmin = false;
			}

			if(checkToken.loggedIn() ){
				$scope.loggedIn = true;
			}else{
				$scope.loggedIn = false;
			}

			if(checkToken.isAdmin() ){
				$scope.isAdmin = true;
			}else{
				$scope.isAdmin = false;
			}

			return 'view/user/navigation.html';		
		}	
			
	};

	//pozwala zwrócić aktulną ścieszkę
	//console.log($location.path());
	$scope.isActive = function ( path) {			
		return $location.path() === path;
	};

	// Storage
	//store.set('test', 'działa!');

	//Wyświetlanie koszyka jeśli coś w nim jest, watch obserwuje scope dynamicznie
	$scope.$watch(function(){
		$scope.cart = cartServices.show().length;
	});

	$scope.logout = function(){
		checkToken.del();
		location.reload();
	};

}]);


