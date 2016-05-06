'use strict';

var myCtrls = angular.module( 'myCtrls' , [ 'ngRoute' ] );
	

myCtrls.controller( 'navigation' , [ '$scope' , '$location' , function( $scope , $location ){
	
	//pozwala zwrócić aktulną ścieszkę
	console.log($location.path());
	$scope.isActive = function ( path) {			
		return $location.path() === path;
	};

}]);

myCtrls.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'model/produkty.json' ).
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


myCtrls.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

	$http.post( 'model/produkty.json', function(){
		//Łączenie z api	
	}).success( function( data ){
		var products = data;
		$scope.product = products[$routeParams.id];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.saveChanges = function ( product) {
		//Przesyłanie danych przez api
		console.log( product);
		console.log($routeParams.id);
	};

}]);

myCtrls.controller( 'productCreate' , [ '$scope' , '$http', function( $scope , $http){

	$scope.createProduct = function () {
		//Przesłać daone przez api
		console.log($scope.product);
	};

}]);

myCtrls.controller( 'users' , [ '$scope' , '$location' , function( $scope , $location ){
	
	

}]);
