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
			
			var userInfo = {
				email: user.email,
				password: user.password
			};
			
			return authRefObj.$createUser(userInfo).then(function(data){
				//console.log('Registered user');
				publicObj.login(user).then(function(data){
					//console.log(data);
					//console.log('Logged In');
					var userFireRef = new Firebase(FIREBASE_URL + "/users/" + data.uid),
						userObjArray = $firebaseObject(userFireRef),
						userData = {
							date: Firebase.ServerValue.TIMESTAMP,
							userID: data.uid,
							firstName: user.fname,
							lastName: user.lname,
							email: user.email
						};
						
						userFireRef.set(userData);	
						$state.go('home');				
				}).catch(function(error){
					console.error("Authentication failed:", error);
				});
				
				
			}).catch(function(error) {
				
				//error stuff here by showing alart or something cool
				console.error("Authentication failed:", error);
				
			});
			
		}
	}
	
	return publicObj;
}]);