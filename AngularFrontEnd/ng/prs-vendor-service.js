angular.module("PrsApp")
	.service("VendorSvc", Svc);

Svc.$inject = ["$http", "SystemSvc"];

function Svc($http, SystemSvc) {
	var self = this;

	var ctrlr = "/Vendors/";
	var url = SystemSvc.AjaxUrl + ctrlr;

	self.List = function() {
		return $http.get(url + "List");
	}
	self.Get = function(id) {
		return $http.get(url + "Get/" + id);
	}
	self.Change = function(inst) {
		return $http.post(url + "Change", inst);
	}
	self.Add = function(inst) {
		return $http.post(url + "Add", inst);
	}
	self.Remove = function(id) {
		return $http.post(url + "Remove/" + id);
	}
	self.CreatePurchaseOrder = function(id) {
		return $http.post(url + "CreatePurchaseOrder/" + id);
	}
};