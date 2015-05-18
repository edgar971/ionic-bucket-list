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
		console.log($scope.allWishes);
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
}]).controller('AddWishCtrl', ['$scope', '$state', 'FireAPI', 'Camera', function($scope, $state, FireAPI,$cordovaCamera) {
	$scope.wish = {};
	$scope.wish.photo = null;
	$scope.takeMeHomeBro = function() {
		$state.go('home');
	}
	$scope.getPhoto = function() {
		//create a factory for this camera service 
    	console.log('Getting camera');
    	var imageSettings = {
	    	destinationType : Camera.DestinationType.DATA_URL,
			quality: 40,
			targetWidth: 400,
			targetHeight: 400,
			saveToPhotoAlbum: false,
	      
	    }
	    console.log(imageSettings);
	    $cordovaCamera.getPicture(imageSettings).then(function(imageURI) {
	      $scope.wish.photo = 'data:image/jpeg;base64,' + imageURI || null;
	      console.log($scope.wish.photo);
	    }, function(err) {
	      console.err(err);
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