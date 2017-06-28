angular.module("PrsApp")
	.service("SystemSvc", SystemSvc);

SystemSvc.$inject = ["$http", "$filter"];

function SystemSvc($http, $filter) {
	var self = this;
	self.about = "System Service";

	self.GetActiveUser = function() {
		return self.ActiveUser;
	}
	self.SetActiveUser = function(user) {
		self.ActiveUser = user;
	}
	
	self.AjaxUrl = "http://localhost:63409";

	self.ConvertToJsonDate = function(value) {
		return $filter('date')(new Date(value), 'MM/dd/yyyy');
	}
}