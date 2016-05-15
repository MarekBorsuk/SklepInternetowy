'use strict';

var services = angular.module( 'services' , [] );
//https://github.com/auth0/angular-storage
//kod w factory może być używany w innych kontrolerach, koszyk
services.factory('cartServices', [ 'store', function(store){	

	//sprawdzenie czy już produkt jest w karcie
	if(store.get('cart'))
		var cart = store.get('cart');
	else
		var cart = [];

	cart.show = function (){
		return cart;
	};
	cart.add = function(product){		

		if(!cart.length){
			product.qty = 0;
			cart.push(product);
		}
		var addNew = true;
		angular.forEach(cart, function(value, key){			
			if(value.name == product.name){
				addNew = false;
				cart[key].qty++;
				// console.log(value.name);
			}
		});

		if(addNew){
			product.qty = 1;
			cart.push(product);
		}

		store.set('cart', cart);
		
	};

	cart.clear = function(){
		store.remove('cart');
		cart.length = 0;
	};

	cart.update = function(newCart){
		store.set('cart', newCart);
	};

	return cart;
}])