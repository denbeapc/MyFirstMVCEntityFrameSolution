angular
	.module("PrsApp")
	.controller("SystemCtrl", SystemCtrl);

SystemCtrl.$inject = ["$http", "$routeParams", "$location", "SystemSvc"];

function SystemCtrl($http, $routeParams, $location, SystemSvc) {
	var self = this;

	self.Reviewer = SystemSvc.GetReviewerAccess();
}