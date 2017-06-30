angular.module("PrsApp")
	.service("SystemSvc", SystemSvc);

SystemSvc.$inject = ["$http", "$filter", "$location", "$route"];

function SystemSvc($http, $filter, $location, $route) {
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

	self.GetReviewerAccess = function() {
		if(self.ActiveUser != undefined) {
			if(self.ActiveUser.IsReviewer) {
				return true;
			} else {
				return false;
			}
		}

		return false;
	}

	self.GetPurchaseRequestAccess = function(id) {
		if(self.ActiveUser != undefined) {
			if(id == self.ActiveUser.ID || self.ActiveUser.IsAdmin) {
				return true;
			} else {
				return false;
			}
		}

		return false;
	}

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