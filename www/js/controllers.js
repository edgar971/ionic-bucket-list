//home controller
angular.module('myApp.controllers', ['firebase']).controller('AuthCtrl', ['$scope', 'FireAPI', '$state', function($scope, FireAPI, $state) {
 	if(FireAPI.isLoggedIn()) {
	 	$state.go('home');
 	} else {
	 	$scope.Form = {},
	 	$scope.registerToggle = false,
	 	$scope.signIn = function() {
		 	FireAPI.login($scope.Form).then(function(data){
				$state.go('home');	
		 	}).catch(function(error){
			 	console.log(error);
		 	})
		 	
		 	
		 	
		 	
	 	},
	 	$scope.register = function() {
		 	FireAPI.registerUser($scope.Form)
		 		.then(function(data){
					//console.log('Registered user');
					FireAPI.login($scope.Form).then(function(data){
						console.log(data);
						console.log('Logged In');
						userData = {
								date: Firebase.ServerValue.TIMESTAMP,
								userID: data.uid,
								firstName: $scope.Form.fname,
								lastName: $scope.Form.lname,
								email: $scope.Form.email
						};
						FireAPI.addNewUserData(userData);
						$state.go('home');
					}).catch(function(error){
						console.error("FireAPI failed:", error);
					});
				
				
				});
	 	}

 	}

}]).controller('UserHomeCtrl', ['$scope', '$rootScope', 'FireAPI', '$state', function($scope, $rootScope, FireAPI, $state) {
	if(FireAPI.isLoggedIn()) {
		$scope.allWishes = FireAPI.loadWishes();
		
		$scope.loadAddWish = function() {
			$state.go('addAWish');
		}
	} else {
		$state.go('auth');
	}
}]).controller('NavBarCtrl', ['$scope', 'FireAPI', function($scope, FireAPI){
	//watch this to update on event listener
	$scope.loggedin = FireAPI.isLoggedIn(),
	$scope.logout = function() {
		FireAPI.logout();
	}
}]).controller('AddWishCtrl', ['$scope', '$state', 'FireAPI', 'Camera', function($scope, $state, FireAPI, Camera) {
	$scope.wish = {};
	$scope.takeMeHomeBro = function() {
		$state.go('home');
	}
	$scope.getPhoto = function() {
    	console.log('Getting camera');
	    Camera.getPicture().then(function(imageURI) {
	      console.log(imageURI);
	      $scope.wish.photo = imageURI;
	    }, function(err) {
	      console.err(err);
	    }, {
	      quality: 95,
	      targetWidth: 800,
	      targetHeight: 800,
	      saveToPhotoAlbum: false
	    });
	    /*
	    navigator.camera.getPicture(function(imageURI) {
	      console.log(imageURI);
	    }, function(err) {
	    }, { 
	      quality: 50,
	      destinationType: Camera.DestinationType.DATA_URL
	    });
	    */
  	}
  	$scope.addWish = function(wish) {
		
		FireAPI.addUserWish(wish).then(function(){
			$scope.wish = {};
		}).catch(function(error){
			console.log(error);
		});
	}
}]);