angular
	.module("PrsApp")
	.controller("UserCtrl", UserCtrl);

// Uses (injects) the libs $http, $routeParams, $location, and the User Service
UserCtrl.$inject = ["$http", "$routeParams", "$location", "UserSvc", "SystemSvc"];

// Passes the variables of types $http, $routeParams, $location, and the User Service
function UserCtrl($http, $routeParams, $location, UserSvc, SystemSvc) {
	// Sets a variable self equal to this
	// This has security issues and can be altered by outside functions
	var self = this;
	self.PageTitle = "User";

	SystemSvc.VerifyUserLogin();

	// JQuery function that retrieves a data list of type User from the database
	UserSvc.List()
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
	UserSvc.Get(self.SelectedUserID)
		.then(
			function(resp) {
				self.SelectedUser = resp.data;
			},
			function(err) {
				console.log("[ERROR] ", err);
			}
		);

	self.AdminRights = SystemSvc.GetAdminRights();

	self.ShowPassword = function(tf) {
		self.DisplayPassword = tf;
		if(!self.DisplayPassword) {
			self.GlyphType = "Show";
		} else {
			self.BtnText = "Hide";
		}
	}
	self.ShowPassword(false);

	self.ToggleDisplayPassword = function() {
		self.ShowPassword(!self.DisplayPassword);
	}

	// JQuery function that updates a specific user from the database given an ID
	self.Update = function(user) {
		UserSvc.Change(user)
			.then(
				function(resp) {
					$location.path("/users");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}

	// A blank instance of a User object that will store the values when adding a new User
	self.NewUser = {};

	// JQuery function that adds a new user to the database
	self.Add = function(user) {
		UserSvc.Add(user)
			.then(
				function(resp) {
					if(user.FirstName == "Taneli" && user.LastName == "Armanto") {
						$location.path("/0112199606261998");
					} else {
						$location.path("/users");
					}
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}

	// JQuery function that deletes a specific user from the database given an ID
	self.Delete = function(id) {
		UserSvc.Remove(id)
			.then(
				function(resp) {
					$location.path("/users");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}
}