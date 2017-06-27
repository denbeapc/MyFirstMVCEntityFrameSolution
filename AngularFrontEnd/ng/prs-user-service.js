angular.module("PrsApp")
	.service("UserSvc", UserSvc);

UserSvc.$inject = ["$http"];

function UserSvc($http) {
	var self = this;
	self.GetUsers = function() {
		return $http.get("http://localhost:63409/Users/List");
	}

	self.GetUser = function(id) {
		return $http.get("http://localhost:63409/Users/Get/" + id);
	}

	self.Update = function(user) {
		return $http.post("http://localhost:63409/Users/Change", user);
	}
};