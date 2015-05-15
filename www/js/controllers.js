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
}]).controller('AddWishCtrl', ['$scope', '$state', 'FireAPI', function($scope, $state, FireAPI) {
	$scope.wish = {};
	$scope.takeMeHomeBro = function() {
		$state.go('home');
	}
	$scope.addWish = function(wish) {
		
		FireAPI.addUserWish(wish).then(function(){
			$scope.wish = {};
		}).catch(function(error){
			console.log(error);
		});
	}
}]);