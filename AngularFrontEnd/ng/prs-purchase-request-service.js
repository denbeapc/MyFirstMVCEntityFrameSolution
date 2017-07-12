angular.module("PrsApp")
	.service("PurchaseRequestSvc", Svc);

Svc.$inject = ["$http", "SystemSvc"];

function Svc($http, SystemSvc) {
	var self = this;

	var ctrlr = "/PurchaseRequests/";
	var url = SystemSvc.AjaxUrl + ctrlr;

	self.List = function(action) {
		return $http.get(url + action);
	}
	self.ReviewList = function(id) {
		return $http.get(url + "ReadyToReviewList/" + id);
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

	self.GetReviewRestrictions = function(id) {
		var user = SystemSvc.GetActiveUser();
		if(user != undefined) {
			if(user.IsAdmin && user.ID != id) {
				return true;
			} else {
				return false;
			}
		}

		return false;
	}
};