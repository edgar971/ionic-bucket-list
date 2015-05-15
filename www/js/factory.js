//home controller
angular.module('myApp.services', ['firebase']).factory('FireAPI', ['$firebaseAuth', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', '$state', '$rootScope', function($firebaseAuth, $firebaseObject, $firebaseArray, FIREBASE_URL, $state, $rootScope) {
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
			
			var userFireRef = new Firebase(FIREBASE_URL + "/users/" + userData.userID),
				userObjArray = $firebaseObject(userFireRef);
				
			return userFireRef.set(userData);
				
								
				
				
 		},
 		addUserWish: function(wish) {
	 		//needs data validation
	 		var userData = this.isLoggedIn,
	 			userFireRef = new Firebase(FIREBASE_URL + "/users/" + userData.uid + "/wishes/"),
	 			userWishes = $firebaseArray(userFireRef),
	 			wishObj = {
		 			name: wish.name,
		 			desire: wish.desire
	 			};
	 			
	 			return userWishes.$add(wishObj);
	 		
 		},
 		loadWishes: function() {
	 		var userData = this.isLoggedIn,
	 			userFireRef = new Firebase(FIREBASE_URL + "/users/" + userData.uid + "/wishes/");
	 			
	 		return $firebaseArray(userFireRef);
 		}
	}
	
	return publicObj;
}]);