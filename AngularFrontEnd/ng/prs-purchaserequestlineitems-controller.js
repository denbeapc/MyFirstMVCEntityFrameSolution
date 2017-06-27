angular
	.module("PrsApp")
	.controller("PurchaseRequestLineItemCtrl", PurchaseRequestLineItemCtrl);

// Uses (injects) the libs $http, $routeParams, $location, and $route
PurchaseRequestLineItemCtrl.$inject = ["$http", "$routeParams", "$location", "$route"];

// Passes the variables of types $http, $routeParams, $location, and $route
function PurchaseRequestLineItemCtrl($http, $routeParams, $location, $route) {
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

	self.GetPurchaseRequests = function() {
		$http.get("http://localhost:63409/PurchaseRequests/List")
			.then(
				// if successful
				function(resp) {
					// .data allows the user to access the part of the json object that contains the PurchaseRequest object
					try {
						self.PurchaseRequests = resp.data;

						// Both DateNeeded and SubmittedDate are converted to String Dates accepted by AngularJS
						for(var idx in self.PurchaseRequests) {
							self.PurchaseRequests[idx].DateNeeded 
								= Number(self.PurchaseRequests[idx].DateNeeded.replace('/Date(','').replace(')/',''));

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
	self.GetPurchaseRequests();

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
		var action = (prId == undefined) ? "List" : "ListByPurchaseRequest/" + prId.toString();
		$http.get("http://localhost:63409/PurchaseRequestLineItems/" + action)
			.then(
				// if successful
				function(resp) {
					// .data allows the user to access the part of the json object that contains the PurchaseRequestLineItem object
					self.PurchaseRequestLineItems = resp.data;
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
					// .data allows the user to access the part of the json object that contains the PurchaseRequestLineItem object
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
	self.Update = function(purchaserequestlineitem) {
		$http.post("http://localhost:63409/PurchaseRequestLineItems/Change", purchaserequestlineitem)
			.then(
				// if successful
				function(resp) {
					$location.path("/purchaserequestlineitems/" + purchaserequestlineitem.PurchaseRequestID);
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	// A blank instance of a PurchaseRequest object that will store the values when adding a new PurchaseRequest
	self.NewPurchaseRequestLineItem = {
		PurchaseRequestID: self.SelectedPurchaseRequestID
	};

	// JQuery function that adds a new purchase request to the database
	self.Add = function(purchaserequestlineitem) {
		$http.post("http://localhost:63409/PurchaseRequestLineItems/Add", purchaserequestlineitem)
			.then(
				// if successful
				function(resp) {
					$location.path("/purchaserequestlineitems/" + purchaserequestlineitem.PurchaseRequestID);
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	// JQuery function that deletes a specific purchase request from the database given an ID
	self.Delete = function(id, pr) {
		$http.post("http://localhost:63409/PurchaseRequestLineItems/Remove/" + id)
			.then(
				// if successful
				function(resp) {
					$route.reload();
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}
}