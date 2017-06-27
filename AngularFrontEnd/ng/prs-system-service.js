angular.module("PrsApp")
	.service("SystemSvc", SystemSvc);

SystemSvc.$inject = ["$http", "$filter"];

function SystemSvc($http, $filter) {
	var self = this;
	
	self.AjaxUrl = "http://localhost:63409";

	self.ConvertToJsonDate = function(value) {
		return $filter('date')(new Date(value), 'MM/dd/yyyy');
	}
}