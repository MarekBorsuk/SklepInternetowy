'use strict';

var controllerUser = angular.module( 'controllerUser' , [ 'ngRoute' ] );

controllerUser.controller( 'userShowProducts' , [ '$scope' , '$http', 'cartServices', function( $scope , $http, cartServices ){
	
	$http.get( 'model/products.json' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});	

	$scope.addToCart = function(product){
		cartServices.add(product);
	};

}]);


controllerUser.controller( 'userShowProduct' , [ '$scope' , '$http' , '$routeParams','cartServices', function( $scope , $http , $routeParams, cartServices ){

	$http.post( 'model/products.json', function(){
		//Łączenie z api	
	}).success( function( data ){
		var products = data;
		$scope.product = products[$routeParams.id];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});	

	$scope.addToCart = function(product){
		cartServices.add(product);
	};

}]);



controllerUser.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

	$http.post( 'model/users.json' ).
	success( function( data ){
		var users = data;
		$scope.user = users[$routeParams.id];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.saveChanges = function ( user ) {

		// TODO: przesłać dane przez API

		console.log( user );
		console.log( $routeParams.id );
	};

}]);

controllerUser.controller( 'orders' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'model/orders.json' ).
	success( function( data ){
		$scope.orders = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function (order, $index) {		
		$scope.orders.splice($index, 1);
		
	};

	$scope.changeStatus = function (order) {	
		if(order.status == 0) {
			order.status = 1;
		} else {
			order.status = 0;
		}
		//console.log(order.status);
	};

}]);

controllerUser.controller( 'cartCtrl' , [ '$scope', '$http', 'cartServices', function( $scope , $http, cartServices ){
	
	$scope.cart = cartServices.show();

	$scope.clearCart = function(){
		cartServices.clear();
	};
	
	$scope.total = function (){
		var total = 0;
		angular.forEach($scope.cart , function(item){
			total += item.qty * item.price;
		});
		return total;
	};

	$scope.removeItem = function($index ){
		$scope.cart.splice($index, 1);
		cartServices.update($scope.cart);
	};

	$scope.setOrder = function($event){		
		
		//Spr czy użytkownik jest zalogowany
		var loggedIn = true;	
		
		if(!loggedIn){
			$scope.alert = {type: 'warning', msg: 'Zaloguj się aby złożyć zamówienie!'};
			//zapobiegnięcie przesłania zamówienia
			$event.preventDefault();
			return false;
		}	

		//Zapisywanie do bazy zamówienia
		console.log($scope.total());
		console.log($scope.cart);

		$scope.alert = {type: 'success', msg: 'Zamówienie złożeone, trwa przekierowanie do płatności!'};
		
		cartServices.clear();
		
		
		//blokowanie paypala
		$event.preventDefault();
		$('#paypalForm').submit();
	};

	//rozwiązanie problemu dla ilość w koszyku po odświażaniu przeglądarki - zapisuje zmiany po przez
	//nadpisanie koszyka. $watch wykrywa zmiany w $scope
	$scope.$watch(function (){
		cartServices.update($scope.cart);
	});

}]);

