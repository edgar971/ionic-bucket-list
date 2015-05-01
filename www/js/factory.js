//home controller
angular.module('myApp.services', ['firebase']).factory('Authentication', ['$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', '$state', '$rootScope', function($firebaseAuth, $firebaseObject, FIREBASE_URL, $state, $rootScope) {
	var firebaseRef = new Firebase(FIREBASE_URL);
	var authRefObj = $firebaseAuth(firebaseRef);
	var publicObj =  {
		
		logout: function() {
			
			authRefObj.$unauth();
			
			$state.go('auth');
			
		},
		
		isLoggedIn: function() {
			
			return authRefObj.$getAuth() != null; 
		},
		
		login: function(user) {
			
			return authRefObj.$authWithPassword({
				email: user.email,
				password: user.password
			}).catch(function(error) {
				
				//error stuff here by showing alart or something cool
				console.error("Authentication failed:", error);
				
			});
		},
		
		registerUser: function(user) {
			
			//console.log(user);
			
 			
			return authRefObj.$createUser({
				email: user.email,
				password: user.password
			}).catch(function(error) {
				
				//error stuff here by showing alart or something cool
				console.error("Authentication failed:", error);
				
			});
			
		}, 
		addNewUserData: function(userData) {
			console.log(userData);
			var userFireRef = new Firebase(FIREBASE_URL + "/users/" + userData.userID),
				userObjArray = $firebaseObject(userFireRef);
				
			return userFireRef.set(userData);
				
								
				
				
 		}
	}
	
	return publicObj;
}]);