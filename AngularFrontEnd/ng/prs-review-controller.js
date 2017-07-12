angular
	.module("PrsApp")
	.controller("ReviewCtrl", ReviewCtrl);

ReviewCtrl.$inject = ["$http", "$routeParams", "$location", "PurchaseRequestSvc", 
						"UserSvc", "SystemSvc", "PurchaseRequestLineItemSvc"];

function ReviewCtrl($http, $routeParams, $location, PurchaseRequestSvc, 
						UserSvc, SystemSvc, PurchaseRequestLineItemSvc) {
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
	self.ReviewerRights = SystemSvc.GetReviewerAccess();

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
							self.PurchaseRequests[idx].SubmittedDate 
								= SystemSvc.ConvertToJsonDate(self.PurchaseRequests[idx].SubmittedDate);
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

	// JQuery function that retrieves a data list of type PurchaseRequests from the database
	self.GetPurchaseRequestsReadyForReview = function() {
		var uId;
		if(!self.ReviewerRights || SystemSvc.GetActiveUser() == undefined) {
			uId = null;
		} else {
			uId = SystemSvc.GetActiveUser().ID;
		}
		PurchaseRequestSvc.ReviewList(uId)
			.then(
				function(resp) {
					try {
						self.PurchaseRequestsToBeReviewed = resp.data;

						for(var idx in self.PurchaseRequestsToBeReviewed) {
							self.PurchaseRequestsToBeReviewed[idx].DateNeeded 
								= SystemSvc.ConvertToJsonDate(self.PurchaseRequestsToBeReviewed[idx].DateNeeded);
							self.PurchaseRequestsToBeReviewed[idx].SubmittedDate 
								= SystemSvc.ConvertToJsonDate(self.PurchaseRequestsToBeReviewed[idx].SubmittedDate);
						}
					} catch(error) {
						console.log(error.message);
					}
				},
				function(err) {
					self.PurchaseRequestsToBeReviewed = [];
					console.log("[ERROR] ", err);
				}
			);
	}
	self.GetPurchaseRequestsReadyForReview();

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
						self.SelectedPurchaseRequest.SubmittedDate 
							= SystemSvc.ConvertToJsonDate(self.SelectedPurchaseRequest.SubmittedDate);

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

	// self.ReviewPurchaseRequest = function() {
	// 	self.SelectedPurchaseRequest.Status = self.PrStatus.Review;
	// 	self.Update(self.SelectedPurchaseRequest);
	// }

	self.DeliveryOptions = [ "USPS", "FedEx", "UPS", "DHL Express" ];

	// JQuery function that retrieves a data list of type PurchaseRequests from the database
	self.GetPurchaseRequestLineItems = function(prId) {
		var action = (prId == undefined) ? "List" : "ListByPurchaseRequest/" + prId.toString();
		PurchaseRequestLineItemSvc.List(action)
			.then(
				function(resp) {
					self.PurchaseRequestLineItems = resp.data;
				},
				function(err) {
					self.PurchaseRequestLineItems = [];
					console.log("[ERROR] ", err);
				}
			);
	}
	self.GetPurchaseRequestLineItems(self.SelectedPurchaseRequestID);

	// JQuery function that retrieves a specific purchase request from the database given an ID
	self.GetPurchaseRequestLineItem = function(id) {
		if(id == undefined)
			return;
		PurchaseRequestLineItemSvc.Get(id)
			.then(
				function(resp) {
					self.SelectedPurchaseRequestLineItem = resp.data;
				},
				function(err) {
					console.log("[ERROR] ", err);
				}
			);
	}
	self.GetPurchaseRequestLineItem(self.SelectedPurchaseRequestLineItemID);

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

	self.Approve = function() {
		self.SelectedPurchaseRequest.Status = self.PrStatus.Approved;
		self.Update(self.SelectedPurchaseRequest);
	}

	self.Reject = function() {
		self.SelectedPurchaseRequest.Status = self.PrStatus.Rejected;
		self.Update(self.SelectedPurchaseRequest);
	}

	self.Update = function(purchaserequest) {
		PurchaseRequestSvc.Change(purchaserequest)
			.then(
				function(resp) {
					$location.path("/review");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}
}