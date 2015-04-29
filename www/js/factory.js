//home controller
angular.module('myApp.services', ['firebase']).factory('Authentication', ['$firebaseAuth', 'FIREBASE_URL', '$state', '$rootScope', function($firebaseAuth, FIREBASE_URL, $state, $rootScope) {
	var firebaseRef = new Firebase(FIREBASE_URL);
	var authRefObj = $firebaseAuth(firebaseRef);
	var that =  {
		login: function(user) {
			authRefObj.$authWithPassword({
				email: user.username,
				password: user.password
			}).then(function(data){
				
				$state.go('home');
			}).catch(function(error) {
				//error stuff
				console.error("Authentication failed:", error);
			});
		},
		logout: function() {
			authRefObj.$unauth();
			$state.go('auth');
			
		},
		isLoggedIn: function() {
			return authRefObj.$getAuth() != null; 
		}
	}
	
	return that;
}]);