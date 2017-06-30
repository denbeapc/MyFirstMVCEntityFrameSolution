angular
	.module("PrsApp")
	.controller("PurchaseRequestCtrl", PurchaseRequestCtrl);

PurchaseRequestCtrl.$inject = ["$http", "$routeParams", "$location", "PurchaseRequestSvc", "UserSvc", "SystemSvc"];

function PurchaseRequestCtrl($http, $routeParams, $location, PurchaseRequestSvc, UserSvc, SystemSvc) {
	var self = this;
	self.PrStatus = {
		New : "NEW",
		Review: "REVIEW",
		Approved: "APPROVED",
		Rejected: "REJECTED"
	};

	self.PageTitle = "Purchase Request";

	SystemSvc.VerifyUserLogin();
	self.AdminRights = SystemSvc.GetAdminRights();

	// JQuery function that retrieves a data list of type PurchaseRequests from the database
	self.GetPurchaseRequests = function() {
		var action;
		if(self.AdminRights || SystemSvc.GetActiveUser() == undefined) {
			action = "List";
		} else {
			var uId = SystemSvc.GetActiveUser().ID.toString();
			action = "ListByUser/" + uId;
		}

		PurchaseRequestSvc.List(action)
			.then(
				function(resp) {
					try {
						self.PurchaseRequests = resp.data;

						for(var idx in self.PurchaseRequests) {
							self.PurchaseRequests[idx].DateNeeded 
								= SystemSvc.ConvertToJsonDate(self.PurchaseRequests[idx].DateNeeded);
						}
					} catch(error) {
						console.log(error.message);
					}
				},
				function(err) {
					self.PurchaseRequests = [];
					console.log("[ERROR] ", err);
				}
			);
	}
	self.GetPurchaseRequests();

	self.SelectedPurchaseRequestID = $routeParams.id;

	// JQuery function that retrieves a specific purchase request from the database given an ID
	self.GetPurchaseRequest = function(id) {
		if(id == undefined)
			return;
		PurchaseRequestSvc.Get(self.SelectedPurchaseRequestID)
			.then(
				function(resp) {
					try {
						self.SelectedPurchaseRequest = resp.data;

						self.SelectedPurchaseRequest.DateNeeded 
							= SystemSvc.ConvertToJsonDate(self.SelectedPurchaseRequest.DateNeeded);

						self.UserAccessRights = SystemSvc.GetPurchaseRequestAccess(self.SelectedPurchaseRequest.UserID);
						self.ReviewRestrictions 
							= PurchaseRequestSvc.GetReviewRestrictions(self.SelectedPurchaseRequest.UserID);
					} catch(error) {
						console.log(error.message);
					}
				},
				function(err) {
					console.log("[ERROR] ", err);
				}
			);
	}
	self.GetPurchaseRequest(self.SelectedPurchaseRequestID)

	self.DeliveryOptions = [ "USPS", "FedEx", "UPS", "DHL Express" ];

	// JQuery function that updates a specific purchase request from the database given an ID
	self.Update = function(purchaserequest) {
		purchaserequest.SubmittedDate = new Date();
		PurchaseRequestSvc.Change(purchaserequest)
			.then(
				function(resp) {
					$location.path("/purchaserequests");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}

	if(SystemSvc.GetActiveUser() != undefined) {
		self.NewPurchaseRequest = {
			UserID: (SystemSvc.GetActiveUser()).ID,
			Status: self.PrStatus.New,
			DateNeeded: SystemSvc.ConvertToJsonDate(new Date()),
			SubmittedDate: SystemSvc.ConvertToJsonDate(new Date()),
			DocsAttached: false,
			Total: 0.00,
			DeliveryMode: 'USPS'
		};
	}
	

	// JQuery function that adds a new purchase request to the database
	self.Add = function(purchaserequest) {
		PurchaseRequestSvc.Add(purchaserequest)
			.then(
				function(resp) {
					$location.path("/purchaserequests");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}

	self.GetUsers = function() {
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
	}
	self.GetUsers();

	// JQuery function that deletes a specific purchase request from the database given an ID
	self.Delete = function(id) {
		PurchaseRequestSvc.Remove(id)
			.then(
				function(resp) {
					$location.path("/purchaserequests");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}
}