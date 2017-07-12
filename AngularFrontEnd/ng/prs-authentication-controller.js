angular
	.module("PrsApp")
	.controller("AuthenticationCtrl", AuthenticationCtrl);

AuthenticationCtrl.$inject = ["$http", "$routeParams", "$location", "$route", "UserSvc", "SystemSvc"];

function AuthenticationCtrl($http, $routeParams, $location, $route, UserSvc, SystemSvc) {
	var self = this;

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

	self.LoggedIn = SystemSvc.CheckIfUserLoggedIn();
	if(SystemSvc.GetActiveUser() != undefined) {
		self.ActiveUser = SystemSvc.GetActiveUser();
	}

	self.LoginUser;
	self.Login = function(user) {
		SystemSvc.SetActiveUser(undefined);
		self.LabelErrorMessage = false;

		for(var x in self.Users) {
			if(user.UserName == self.Users[x].UserName && user.Password == self.Users[x].Password) {
				SystemSvc.SetActiveUser(self.Users[x]);
				$location.path("/");
				makeActive(1);
				break;
			} else {
				SystemSvc.SetActiveUser(undefined);
			}
		}

		if(SystemSvc.GetActiveUser() == undefined) {
			clearLoginInputs();
			self.LabelErrorMessage = true;
		}
	}

	self.Logout = function() {
		SystemSvc.SetActiveUser(undefined);
		$route.reload();
	}
}