//home controller
angular.module('myApp.services', ['firebase']).factory('Authentication', ['$firebaseAuth', 'FIREBASE_URL', '$state', function($firebaseAuth, FIREBASE_URL, $state) {
	var firebaseRef = new Firebase(FIREBASE_URL);
	var authRefObj = $firebaseAuth(firebaseRef);
	return {
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
		}
	}
}]);