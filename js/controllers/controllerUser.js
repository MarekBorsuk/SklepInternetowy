'use strict';

var controllerUser = angular.module( 'controllerUser' , [ 'ngRoute' ] );

controllerUser.controller( 'userShowProducts' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'model/products.json' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function (product, $index) {
		//splice usuwanie/dodawanie obiektów, używamy go na zbiorach danych,
		//1 parametr index	
		//2/3 parametr ilość następnych do usunięcia/dodania obiektów	
		$scope.products.splice($index, 1);	

		//Przesyłanie danych przez api	
	};

}]);


controllerUser.controller( 'userShowProduct' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

	$http.post( 'model/products.json', function(){
		//Łączenie z api	
	}).success( function( data ){
		var products = data;
		$scope.product = products[$routeParams.id];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	// -------------funkcja dla admina----------
	// $scope.saveChanges = function ( product) {
	// 	//Przesyłanie danych przez api
	// 	console.log( product);
	// 	console.log($routeParams.id);
	// };

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