angular
	.module("PrsApp")
	.controller("PurchaseRequestLineItemCtrl", PurchaseRequestLineItemCtrl);

// Uses (injects) the libs $http, $routeParams, and $location
PurchaseRequestLineItemCtrl.$inject = ["$http", "$routeParams", "$location"];

// Passes the variables of types $http, $routeParams, and $location
function PurchaseRequestLineItemCtrl($http, $routeParams, $location) {
	// Sets a variable self equal to this
	// This has security issues and can be altered by outside functions
	var self = this;

	// Creates a variable inside of self that takes the (optional) parameters 'id'
	self.SelectedPurchaseRequestLineItemID = $routeParams.id;
	self.SelectedPurchaseRequestID = $routeParams.prId;

	// Used to set the Page Title dynamically
	self.PageTitle = "Line Items";

	// Creates an instance of an array called PurchaseRequests inside the variable Self
	self.PurchaseRequests = [];

	self.GetPurchaseRequest = function(id) {
		if(id == undefined)
			return;
		$http.get("http://localhost:63409/PurchaseRequests/Get/" + id.toString())
			.then(
				// if successful
				function(resp) {
					// .data allows the user to access the part of the json object that contains the PurchaseRequest object
					try {
						self.SelectedPurchaseRequest = resp.data;

						// Both DateNeeded and SubmittedDate are converted to String Dates accepted by AngularJS
						self.SelectedPurchaseRequest.DateNeeded
							= Number(self.SelectedPurchaseRequest.DateNeeded.replace('/Date(','').replace(')/',''));
					} catch(error) {
						console.log(error.message);
					}
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}
	self.GetPurchaseRequest(self.SelectedPurchaseRequestID);

	self.GetProducts = function() {
		$http.get("http://localhost:63409/Products/List")
			.then(
				function(resp) {
					self.Products = resp.data;
				},
				function(err) {
					console.log("ERROR:", err)
				}
			);
	}
	self.GetProducts();

	// JQuery function that retrieves a data list of type PurchaseRequests from the database
	self.GetPurchaseRequestLineItems = function(prId) {
		$http.get("http://localhost:63409/PurchaseRequestLineItems/List")
			.then(
				// if successful
				function(resp) {
					// .data allows the user to access the part of the json object that contains the PurchaseRequest object
					try {
						if(prId == undefined) {
							self.PurchaseRequestLineItems = resp.data;
						} else {
							self.PurchaseRequestLineItems = [];
							for(var idx in resp.data) {
								var prItem = resp.data[idx];
								if(prItem.PurchaseRequestID == prId) {
									self.PurchaseRequestLineItems.push(prItem);
								}
							}
						}
					} catch(error) {
						console.log(error.message);
					}
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}
	self.GetPurchaseRequestLineItems(self.SelectedPurchaseRequestID);

	// JQuery function that retrieves a specific purchase request from the database given an ID
	self.GetPurchaseRequestLineItem = function(id) {
		if(id == undefined)
			return;
		$http.get("http://localhost:63409/PurchaseRequestLineItems/Get/" + id.toString())
			.then(
				// if successful
				function(resp) {
					// .data allows the user to access the part of the json object that contains the PurchaseRequest object
					try {
						self.SelectedPurchaseRequestLineItem = resp.data;
					} catch(error) {
						console.log(error.message);
					}
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}
	self.GetPurchaseRequestLineItem(self.SelectedPurchaseRequestLineItemID);


	// JQuery function that updates a specific purchase request from the database given an ID
	self.Update = function(purchaserequest) {
		$http.post("http://localhost:63409/PurchaseRequestLineItems/Change", purchaserequest)
			.then(
				// if successful
				function(resp) {
					$location.path("/purchaserequestlineitems");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	// A blank instance of a PurchaseRequest object that will store the values when adding a new PurchaseRequest
	self.NewPurchaseRequestLineItem = {};

	// JQuery function that adds a new purchase request to the database
	self.Add = function(purchaserequestlineitem) {
		$http.post("http://localhost:63409/PurchaseRequestLineItems/Add", purchaserequestlineitem)
			.then(
				// if successful
				function(resp) {
					$location.path("/purchaserequestlineitems");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	// JQuery function that deletes a specific purchase request from the database given an ID
	self.Delete = function(id) {
		$http.post("http://localhost:63409/PurchaseRequestLineItems/Remove/" + id)
			.then(
				// if successful
				function(resp) {
					$location.path("/purchaserequestlineitems");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}
}