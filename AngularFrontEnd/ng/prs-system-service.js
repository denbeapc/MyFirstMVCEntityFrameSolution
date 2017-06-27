angular.module("PrsApp")
	.service("SystemSvc", SystemSvc);

SystemSvc.$inject = ["$http"];

function SystemSvc($http) {
	var self = this;
	
	self.AjaxUrl = "http://localhost:63409";
}