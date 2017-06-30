angular
	.module("PrsApp")
	.controller("PurchaseRequestLineItemCtrl", PurchaseRequestLineItemCtrl);

PurchaseRequestLineItemCtrl.$inject = ["$http", "$routeParams", "$location", "$route", "SystemSvc", 
										"PurchaseRequestLineItemSvc", "PurchaseRequestSvc", "ProductSvc"];

function PurchaseRequestLineItemCtrl($http, $routeParams, $location, $route, SystemSvc, 
										PurchaseRequestLineItemSvc, PurchaseRequestSvc, ProductSvc) {
	var self = this;
	self.PageTitle = "Line Items";

	SystemSvc.VerifyUserLogin();
	self.AdminRights = SystemSvc.GetAdminRights();

	self.SelectedPurchaseRequestLineItemID = $routeParams.id;
	self.SelectedPurchaseRequestID = $routeParams.prId;

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

	self.GetProducts = function() {
		ProductSvc.List()
			.then(
				function(resp) {
					self.Products = resp.data;
				},
				function(err) {
					self.Products = [];
					console.log("[ERROR] ", err);
				}
			);
	}
	self.GetProducts();

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

	// JQuery function that updates a specific purchase request from the database given an ID
	self.Update = function(purchaserequestlineitem) {
		PurchaseRequestLineItemSvc.Change(purchaserequestlineitem)
			.then(
				function(resp) {
					$location.path("/purchaserequestlineitems/" + purchaserequestlineitem.PurchaseRequestID);
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}

	self.NewPurchaseRequestLineItem = {
		PurchaseRequestID: self.SelectedPurchaseRequestID
	};

	// JQuery function that adds a new purchase request to the database
	self.Add = function(purchaserequestlineitem) {
		PurchaseRequestLineItemSvc.Add(purchaserequestlineitem)
			.then(
				function(resp) {
					$location.path("/purchaserequestlineitems/" + purchaserequestlineitem.PurchaseRequestID);
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}

	// JQuery function that deletes a specific purchase request from the database given an ID
	self.Delete = function(id) {
		PurchaseRequestLineItemSvc.Remove(id)
			.then(
				function(resp) {
					$route.reload();
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}
}