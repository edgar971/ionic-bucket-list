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
	 		var userData = authRefObj.$getAuth(),
	 			userFireRef = new Firebase(FIREBASE_URL + "/users/" + userData.uid + "/wishes/"),
	 			userWishes = $firebaseArray(userFireRef),
	 			fileReader = new FileReader(),
	 			wishObj = {},
	 			imageData = null;
	 			if(wish.photo != null) {
		 			console.log("has image", fileReader);
		 			fileReader.onload = (function(file){
			 			return function(e) {
				 			var fileData = e.target.result;
				 			console.log(fileData);
			 			}
		 			})();
		 			fileReader.readAsDataURL(wish.photo);
	 			}
	 			wishObj = {
		 			name: wish.name,
		 			photo: imageData,
		 			desire: wish.desire
	 			};
	 			return userWishes.$add(wishObj);
	 		
 		},
 		loadWishes: function() {
	 		var userData = authRefObj.$getAuth(),
	 			userFireRef = new Firebase(FIREBASE_URL + "/users/" + userData.uid + "/wishes/");
	 			
	 		return $firebaseArray(userFireRef);
 		},
 		
	}
	
	return publicObj;
}]).factory('Camera', ['$q', function($q) {
 
   return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}])