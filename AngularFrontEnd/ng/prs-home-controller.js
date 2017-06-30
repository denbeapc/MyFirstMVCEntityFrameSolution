angular
	.module("PrsApp")
	.controller("HomeCtrl", HomeCtrl);

HomeCtrl.$inject = ["$http", "$routeParams", "$location", "UserSvc", "SystemSvc"];

function HomeCtrl($http, $routeParams, $location, UserSvc, SystemSvc) {
	var self = this;

	self.WelcomeUser = (SystemSvc.GetActiveUser() != undefined) 
		? "Welcome " + SystemSvc.GetActiveUser().FirstName + " " + SystemSvc.GetActiveUser().LastName + "!" 
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