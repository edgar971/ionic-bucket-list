//home controller
angular.module('myApp.controllers', ['firebase']).controller('AuthCtrl', ['$scope', 'Authentication', '$state', function($scope, Authentication, $state) {
 	if(Authentication.isLoggedIn()) {
	 	$state.go('home');
 	} else {
	 	$scope.loginForm = {},
	 	$scope.signIn = function() {
		 	Authentication.login($scope.loginForm);
		 	
	 	}
 	}

}]).controller('UserHomeCtrl', ['$scope', '$rootScope', 'Authentication', '$state', function($scope, $rootScope, Authentication, $state) {
	if(Authentication.isLoggedIn()) {
		
	} else {
		$state.go('auth');
	}
}]).controller('NavBarCtrl', ['$scope', 'Authentication', function($scope, Authentication){
	$scope.loggedin = Authentication.isLoggedIn(),
	$scope.logout = function() {
		Authentication.logout();
	}
}]);