'use strict'; //wyrzuca powiadomienie z javascript na konsoli w przeglądarc


/*
	Rozwiązanie problemu z ładowanie pliku lokalnie
	 https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally
*/	
	

var app = angular.module( 'app' , [ 'ngRoute', 'angular-storage', 'controllerNavigation', 'controllerAdmin', 'controllerUser', 'services' ] );

app.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider , $httpProvider ) {

	//Ścieszki dostępu

	// --------------Admin produkty--------------
	$routeProvider.when( '/admin/products' , {
		controller : 'products',
		templateUrl : 'view/admin/products.html'
	});

	$routeProvider.when( '/admin/product/edit/:id' , {
		controller: 'productEdit',
		templateUrl : 'view/admin/product-edit.html'
	});

	$routeProvider.when( '/admin/product/create/' , {
		controller: 'productCreate',
		templateUrl : 'view/admin/product-create.html'
	});

	// --------------Admin users---------------
	$routeProvider.when( '/admin/users' , {
		controller: 'users',
		templateUrl : 'view/admin/users.html'
	});

	$routeProvider.when( '/admin/user/edit/:id' , {
		controller: 'userEdit',
		templateUrl : 'view/admin/user-edit.html'
	});

	$routeProvider.when( '/admin/user/create/' , {
		controller: 'userCreate',
		templateUrl : 'view/admin/user-create.html'
	});
	//-------------Admin Zamówienia--------------
	$routeProvider.when( '/admin/orders' , {
		controller: 'orders',
		templateUrl : 'view/admin/orders.html'
	});

	// --------------User produkty--------------
	$routeProvider.when( '/products' , {
		controller : 'userShowProducts',
		templateUrl : 'view/user/products.html'
	});

	$routeProvider.when( '/product/:id' , {
		controller: 'userShowProduct',
		templateUrl : 'view/user/product.html'
	});

	$routeProvider.when( '/cart' , {
		controller: 'cartCtrl',
		templateUrl : 'view/user/cart.html'
	});

	$routeProvider.when( '/orders' , {
		controller: 'userOrders',
		templateUrl : 'view/user/orders.html'
	});


	//------------login---------------
	$routeProvider.when( '/login' , {
		controller: 'login',
		templateUrl : 'view/user/login.html'
	});

	$routeProvider.when( '/register' , {
		controller: 'register',
		templateUrl : 'view/user/register.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/products'
	});

}]);


