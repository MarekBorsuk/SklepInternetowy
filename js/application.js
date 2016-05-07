'use strict'; //wyrzuca powiadomienie z javascript na konsoli w przeglądarc


/*
	Rozwiązanie problemu z ładowanie pliku lokalnie
	 https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally
*/	
	

var app = angular.module( 'app' , [ 'ngRoute' , 'myCtrls' ] );

app.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider , $httpProvider ) {

	//ścieszki dostępu
	$routeProvider.when( '/products' , {
		controller : 'products',
		templateUrl : 'view/products.html'
	});

	$routeProvider.when( '/product/edit/:id' , {
		controller: 'productEdit',
		templateUrl : 'view/product-edit.html'
	});

	$routeProvider.when( '/product/create/' , {
		controller: 'productCreate',
		templateUrl : 'view/product-create.html'
	});

	$routeProvider.when( '/users' , {
		controller: 'users',
		templateUrl : 'view/users.html'
	});

	$routeProvider.when( '/user/edit/:id' , {
		controller: 'userEdit',
		templateUrl : 'view/user-edit.html'
	});

	// $routeProvider.when( '/user/edit/:id' , {
	// 	controller: 'userEdit',
	// 	templateUrl : 'view/user-edit.html'
	// });

	$routeProvider.when( '/user/create/' , {
		controller: 'userCreate',
		templateUrl : 'view/user-create.html'
	});

	$routeProvider.when( '/login' , {
		controller: 'login',
		templateUrl : 'view/login.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}]);


