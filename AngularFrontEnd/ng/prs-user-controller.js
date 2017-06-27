angular
	.module("PrsApp")
	.controller("UserCtrl", UserCtrl);

// Uses (injects) the libs $http, $routeParams, and $location
UserCtrl.$inject = ["$http", "$routeParams", "$location", "UserSvc"];

// Passes the variables of types $http, $routeParams, and $location
function UserCtrl($http, $routeParams, $location, UserSvc) {
	// Sets a variable self equal to this
	// This has security issues and can be altered by outside functions
	var self = this;

	// JQuery function that retrieves a data list of type Users from the database
	UserSvc.GetUsers()
		.then(
			function(resp) {
				self.Users = resp.data;
			},
			function(err) {
				self.Users = [];
				console.log("[ERROR] ", err);
			}
		);

	// Creates a variable inside of self that takes the (optional) parameters 'id'
	self.SelectedUserID = $routeParams.id;

	// JQuery function that retrieves a specific user from the database given an ID
	UserSvc.GetUser(self.SelectedUserID)
		.then(
			function(resp) {
				self.SelectedUser = resp.data;
			},
			function(err) {
				console.log("[ERROR] ", err);
			}
		);

	// Used to set the Page Title dynamically
	self.PageTitle = "User";

	// self.DisplayPassword = function(tf) {
		
	// }

	// JQuery function that updates a specific user from the database given an ID
	UserSvc.Update(self.user)
		.then(
			function(resp) {
				$location.path("/users");
			},
			function(err) {
				console.log("ERROR:", err);
			}
		);

	// A blank instance of a User object that will store the values when adding a new User
	self.NewUser = {};

	// JQuery function that adds a new user to the database
	self.Add = function(user) {
		$http.post("http://localhost:63409/Users/Add", user)
			.then(
				// if successful
				function(resp) {
					$location.path("/users");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	// JQuery function that deletes a specific user from the database given an ID
	self.Delete = function(id) {
		$http.post("http://localhost:63409/Users/Remove/" + id)
			.then(
				// if successful
				function(resp) {
					$location.path("/users");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}
}