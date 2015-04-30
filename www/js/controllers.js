//home controller
angular.module('myApp.controllers', ['firebase']).controller('AuthCtrl', ['$scope', 'Authentication', '$state', function($scope, Authentication, $state) {
 	if(Authentication.isLoggedIn()) {
	 	$state.go('home');
 	} else {
	 	$scope.Form = {},
	 	$scope.registerToggle = false,
	 	$scope.signIn = function() {
		 	var data = Authentication.login($scope.Form);
		 	console.log(data);
		 	
	 	},
	 	$scope.register = function() {
		 	Authentication.registerUser($scope.Form);
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