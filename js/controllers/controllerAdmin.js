'use strict';

var controllerAdmin = angular.module( 'controllerAdmin' ,['angularFileUpload', 'directives' ] );

controllerAdmin.controller( 'products' , [ '$scope' , '$http' , 'cartServices', function( $scope , $http, cartServices ){
	
	$http.post( 'api/admin/products/get').
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function (product, $index) {
		if(!confirm('Czy napewno chcesz to usunąć?'))
			return false;
		//splice usuwanie/dodawanie obiektów, używamy go na zbiorach danych,
		//1 parametr index	
		//2/3 parametr ilość następnych do usunięcia/dodania obiektów	
		$scope.products.splice($index, 1);	

		//Przesyłanie danych przez api	
		$http.post( 'api/admin/products/delete/', {
			product : product
			}).
			success( function(){
				$scope.success = true;
				$timeout(function(){
					$scope.success = false;
					$scope.product = {};
				}, 3000);
			}).error( function(){
				console.log( 'Błąd pobrania pliku json' );
			});
		};
	

	// cart.show();


}]);


controllerAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams', 'FileUploader', '$timeout', function( $scope , $http , $routeParams, FileUploader, $timeout ){

	var productId = $routeParams.id;
	$scope.id = productId;

	$http.get( 'api/admin/products/get/' + productId).
	success( function( data ){
		$scope.product = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.saveChanges = function ( product) {
		//Przesyłanie danych przez api

		$http.post( 'api/admin/products/update/', {
			product : product
		}).
		success( function(){
			$scope.success = true;
			$timeout(function(){
				$scope.success = false;
			}, 3000);
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});

	};


	function getImages(){
		$http.get( 'api/admin/images/get/' + productId)
		.success( function( data ){
			$scope.images = data;
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}	
	getImages();

	var uploader = $scope.uploader = new FileUploader({
            url: 'api/admin/images/upload/' + productId
    });

	//atomatycznie bez odświeżania strony łądują się obrazki na stronie
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
            getImages();
    };

    $scope.deleteImage = function(imageName, $index){
    	$scope.images.splice($index, 1);

    	$http.post( 'api/admin/images/delete/',{
    		id: productId,
    		image: imageName
    	}).success( function(){
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
    };
	

}]);

controllerAdmin.controller( 'productCreate' , [ '$scope' , '$http', '$timeout', function( $scope , $http, $timeout){

	$scope.createProduct = function (product) {
		//Przesłać dane przez api

		$http.post( 'api/admin/products/create/', {
			product : product
		}).
		success( function(){
			$scope.success = true;
			$timeout(function(){
				$scope.success = false;
				$scope.product = {};
			}, 3000);
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	};

}]);

controllerAdmin.controller( 'users' , [ '$scope' , '$http', '$timeout',  function( $scope , $http, $timeout ){
	
	
	$http.get( 'api/admin/users/get' ).
	success( function( data ){
		$scope.users = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function (user, $index) {	
	if(!confirm('Czy napewno chcesz usunąć urzytkownika?'))
			return false;	
		$scope.users.splice($index, 1);

		$http.post( 'api/admin/users/delete/', {
			user : user
			}).error( function(){
				console.log( 'Błąd pobrania pliku json' );
			});
		};		

}]);


controllerAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams', '$timeout' , function( $scope , $http , $routeParams, $timeout ){

	var userId = $routeParams.id;
	$scope.id = userId;

	$http.post( 'api/admin/users/get/' + userId ).
	success( function( data ){
		$scope.user = data;
		console.log( data );
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.saveChanges = function ( user ) {

		$http.post( 'api/admin/users/update/' , {
			user : user,
			id : userId,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf
		}).success( function( errors ){

			$scope.submit = true;
			
			if ( errors )
			{
				$scope.errors = errors;
			}
			else
			{
				$scope.success = true;
				$timeout(function(){
					$scope.success = false;
					$scope.product = {};
				} , 3000 );
			}

		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

	};


}]);



controllerAdmin.controller( 'userCreate' , [ '$scope' , '$http', '$timeout', function( $scope , $http, $timeout){

	$scope.user = {};
	$scope.user.role = 'user';

	$scope.createUser = function (user) {
		//Przesłać dane przez api

		$http.post( 'api/admin/users/create/', {
			user : user,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf
		}).
		success( function(errors){
			$scope.submit = true;	

			if(errors){
				$scope.errors = errors; 
			}else{
				$scope.success = true;
				$timeout(function(){
				$scope.success = false;
				$scope.user = {};
			}, 3000);
			}	
					
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	};

}]);

controllerAdmin.controller( 'orders' , [ '$scope' , '$http' , function( $scope , $http ){
	
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