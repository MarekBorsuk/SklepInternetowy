'use strict';

var controllerUser = angular.module( 'controllerUser' , [ 'ngRoute' ] );

controllerUser.controller( 'userShowProducts' , [ '$scope' , '$http', 'cartServices', function( $scope , $http, cartServices ){
	
	$http.get( 'api/user/products/get/' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd API' );
	});	

	$scope.addToCart = function(product){
		cartServices.add(product);

		if(cartServices.show().length){
			angular.forEach(cartServices.show(), function(item){
				if(item.id == product.id){
					product.qty = item.qty;
					console.log(product.qty);
				}				
			});
		}
	};

}]);


controllerUser.controller( 'userShowProduct' , [ '$scope' , '$http' , '$routeParams','cartServices', function( $scope , $http , $routeParams, cartServices ){
	var id = $routeParams.id;

	$http.post( 'api/user/products/get/' + id ).
	success( function( data ){
		$scope.product = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});	

	$scope.addToCart = function(product){
		cartServices.add(product);
	};

	function getImages(){
		$http.get( 'api/user/images/getImages/' + id)
		.success( function( data ){
			$scope.images = data;
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}	
	getImages();

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

controllerAdmin.controller( 'userOrders' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'model/orders.json' ).
	success( function( data ){
		$scope.orders = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

}]);

controllerAdmin.controller( 'login' , [ '$scope' , '$http' , 'store', 'checkToken', '$location', function( $scope , $http, store, checkToken, $location ){
	
	if(checkToken.loggedIn()){
		$location.path( "/products");
	}

	$scope.user = {};
	$scope.formSubmit = function ( user ) {

		$http.post( 'api/user/users/login/' , {
			email : user.email,
			password : user.password
		}).success( function( data ){

			$scope.submit = true;
			$scope.error = data.error;
			
			if ( !data.error )
			{
				store.set( 'token' , data.token );
				location.reload();
			}
			
		}).error( function(){
			console.log( 'Błąd połączenia z API' );
		});

	};

	// var token = store.get('token');
	// token = checkToken.decodeToken(token);

	//console.log(checkToken.payload().name);

	//console.log( store.get( 'token' ) );

}]);

controllerAdmin.controller( 'register' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$scope.user = {};

	$scope.formSubmit = function ( user ) {

		$http.post( 'api/user/users/create/' , {
			user : user,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf
		}).success( function( errors ){

			$scope.submit = true;
			$scope.user = {};
			
			if ( errors )
			{
				$scope.errors = errors;
			}
			else
			{
				$scope.errors = {};
				$scope.success = true;
			}
			
		}).error( function(){
			console.log( 'Błąd połączenia z API' );
		});


	};

}]);



