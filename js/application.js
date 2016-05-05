'use strict'; //wyrzuca powiadomienie z javascript na konsoli w przeglądarc


/*
	Rozwiązanie problemu z ładowanie pliku lokalnie
	 https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally
*/	
	

var app = angular.module( 'app' , [ 'ngRoute' , 'controllers' ] );

app.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider , $httpProvider ) {

	$routeProvider.when( '/products' , {
		controller : 'products',
		templateUrl : 'partials/products.html'
	});

	$routeProvider.when( '/product/:id' , {
		controller: 'product',
		templateUrl : 'partials/product.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}]);


