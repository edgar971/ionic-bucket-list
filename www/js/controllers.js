//home controller
angular.module('myApp.controllers', ['firebase']).controller('AuthCtrl', ['$scope', 'Authentication', '$state', function($scope, Authentication, $state) {
 	if(Authentication.isLoggedIn()) {
	 	$state.go('home');
 	} else {
	 	$scope.Form = {},
	 	$scope.registerToggle = false,
	 	$scope.signIn = function() {
		 	Authentication.login($scope.Form).then(function(authData){
			 	$state.go('home');
		 	})
		 	
		 	
	 	},
	 	$scope.register = function() {
		 	Authentication.registerUser($scope.Form)
		 		.then(function(data){
					//console.log('Registered user');
					Authentication.login($scope.Form).then(function(data){
						console.log(data);
						console.log('Logged In');
						userData = {
								date: Firebase.ServerValue.TIMESTAMP,
								userID: data.uid,
								firstName: $scope.Form.fname,
								lastName: $scope.Form.lname,
								email: $scope.Form.email
						};
						Authentication.addNewUserData(userData);
						$state.go('home');
					}).catch(function(error){
						console.error("Authentication failed:", error);
					});
				
				
				});
	 	}

 	}

}]).controller('UserHomeCtrl', ['$scope', '$rootScope', 'Authentication', '$state', function($scope, $rootScope, Authentication, $state) {
	if(Authentication.isLoggedIn()) {
		
	} else {
		$state.go('auth');
	}
}]).controller('NavBarCtrl', ['$scope', 'Authentication', function($scope, Authentication){
	//watch this to update on event listener
	$scope.loggedin = Authentication.isLoggedIn(),
	$scope.logout = function() {
		Authentication.logout();
	}
}]);