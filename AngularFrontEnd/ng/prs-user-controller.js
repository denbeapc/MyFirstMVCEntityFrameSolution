angular
	.module("PrsApp")
	.controller("UserCtrl", UserCtrl);

// Uses (injects) the libs $http, $routeParams, and $location
UserCtrl.$inject = ["$http", "$routeParams", "$location"];

// Passes the variables of types $http, $routeParams, and $location
function UserCtrl($http, $routeParams, $location) {
	// Sets a variable self equal to this
	// This has security issues and can be altered by outside functions
	var self = this;

	// Creates a variable inside of self that takes the (optional) parameters 'id'
	self.SelectedUserID = $routeParams.id;

	// Used to set the Page Title dynamically
	self.PageTitle = "User";

	// self.DisplayPassword = function(tf) {
		
	// }

	// Creates an instance of an array called Users inside the variable Self
	self.Users = [];

	// JQuery function that retrieves a data list of type Users from the database
	$http.get("http://localhost:63409/Users/List")
		.then(
			// if successful
			function(resp) {
				// .data allows the user to access the part of the json object that contains the User object
				self.Users = resp.data;
			},
			// if error
			function(err) {
				// Print error
				console.log("ERROR:", err);
			}
		);

	// JQuery function that retrieves a specific user from the database given an ID
	$http.get("http://localhost:63409/Users/Get/" + self.SelectedUserID)
		.then(
			// if successful
			function(resp) {
				// .data allows the user to access the part of the json object that contains the User object
				self.SelectedUser = resp.data;
			},
			// if error
			function(err) {
				// Print error
				console.log("ERROR:", err);
			}
		);

	// JQuery function that updates a specific user from the database given an ID
	self.Update = function(user) {
		$http.post("http://localhost:63409/Users/Change", user)
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