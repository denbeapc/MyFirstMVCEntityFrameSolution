angular
	.module("PrsApp")
	.controller("HomeCtrl", HomeCtrl);

// Uses (injects) the libs $http, $routeParams, $location, and the User Service
HomeCtrl.$inject = ["$http", "$routeParams", "$location", "UserSvc", "SystemSvc"];

// Passes the variables of types $http, $routeParams, $location, and the User Service
function HomeCtrl($http, $routeParams, $location, UserSvc, SystemSvc) {
	var self = this;

	self.WelcomeUser = (SystemSvc.GetActiveUser() != undefined) 
		? "Welcome " + SystemSvc.GetActiveUser().UserName + "!" 
		: "Welcome to the Purchase Request System (PRS)"; 

	if(SystemSvc.GetActiveUser() != undefined) {
		self.LoggedIn = true;
	} else {
		self.LoggedIn = false;
	}

	self.Logout = function() {
		SystemSvc.SetActiveUser(undefined);
	}
}