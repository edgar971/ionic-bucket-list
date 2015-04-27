//home controller
angular.module('myApp.controllers', ['firebase']).controller('AuthCtrl', ['$scope', 'Authentication', function($scope, Authentication) {
 	$scope.loginForm = {},
 	$scope.signIn = function() {
	 	Authentication.login($scope.loginForm);
	 	
 	}

}]).controller('UserHomeCtrl', ['$scope', '$rootScope', 'Authentication', '$state', function($scope, $rootScope, Authentication, $state) {
	if(Authentication.isLoggedIn()) {
		
	} else {
		$state.go('auth');
	}
}])