angular.module("PrsApp")
	.service("SystemSvc", SystemSvc);

SystemSvc.$inject = ["$http", "$filter", "$location"];

function SystemSvc($http, $filter, $location) {
	var self = this;
	self.about = "System Service";

	self.GetActiveUser = function() {
		return self.ActiveUser;
	}
	self.SetActiveUser = function(user) {
		self.ActiveUser = user;
	}

	self.VerifyUserLogin = function() {
		if(self.ActiveUser == undefined) {
			$location.path("/login");
		}
	}

	// TODO: Create a method that checks to see if the purchase request (or really anything)
	// Matches the active users information/credentials
	// If it matches, only display info for that user

	self.GetAdminRights = function() {
		if(self.ActiveUser != undefined) {
			if(self.ActiveUser.IsAdmin) {
				return true;
			} else {
				return false;
			}
		}

		return false;
	}
	
	self.AjaxUrl = "http://localhost:63409";

	self.ConvertToJsonDate = function(value) {
		return $filter('date')(new Date(value), 'MM/dd/yyyy');
	}
}