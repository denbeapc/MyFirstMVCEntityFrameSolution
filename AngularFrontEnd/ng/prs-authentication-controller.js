angular
	.module("PrsApp")
	.controller("AuthenticationCtrl", AuthenticationCtrl);

// Uses (injects) the libs $http, $routeParams, $location, and the User Service
AuthenticationCtrl.$inject = ["$http", "$routeParams", "$location", "UserSvc", "SystemSvc"];

// Passes the variables of types $http, $routeParams, $location, and the User Service
function AuthenticationCtrl($http, $routeParams, $location, UserSvc, SystemSvc) {
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

	self.LoginUser;
	self.Login = function(user) {
		SystemSvc.SetActiveUser(undefined);
		self.LabelErrorMessage = false;

		for(var x in self.Users) {
			if(user.UserName == self.Users[x].UserName && user.Password == self.Users[x].Password) {
				SystemSvc.SetActiveUser(self.Users[x]);
				$location.path("/");
				break;
			} else {
				SystemSvc.SetActiveUser(undefined);
			}
		}

		if(SystemSvc.GetActiveUser() == undefined) {
			self.LabelErrorMessage = true;
		}
	}
}