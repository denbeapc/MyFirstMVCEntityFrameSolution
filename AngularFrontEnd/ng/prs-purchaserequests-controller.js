angular
	.module("PrsApp")
	.controller("PurchaseRequestCtrl", PurchaseRequestCtrl);

// Uses (injects) the libs $http, $routeParams, and $location
PurchaseRequestCtrl.$inject = ["$http", "$routeParams", "$location"];

// Passes the variables of types $http, $routeParams, and $location
function PurchaseRequestCtrl($http, $routeParams, $location) {
	// Sets a variable self equal to this
	// This has security issues and can be altered by outside functions
	var self = this;

	// Creates a variable inside of self that takes the (optional) parameters 'id'
	self.SelectedPurchaseRequestID = $routeParams.id;

	// Used to set the Page Title dynamically
	self.PageTitle = "Purchase Request";

	// Creates an instance of an array called PurchaseRequests inside the variable Self
	self.PurchaseRequests = [];

	self.DeliveryOptions = [ "USPS", "FedEx", "UPS", "DHL Express" ];

	// JQuery function that retrieves a data list of type PurchaseRequests from the database
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

	// JQuery function that retrieves a specific purchase request from the database given an ID
	$http.get("http://localhost:63409/PurchaseRequests/Get/" + self.SelectedPurchaseRequestID)
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

	// JQuery function that updates a specific purchase request from the database given an ID
	self.Update = function(purchaserequest) {
		$http.post("http://localhost:63409/PurchaseRequests/Change", purchaserequest)
			.then(
				// if successful
				function(resp) {
					$location.path("/purchaserequests");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	// A blank instance of a PurchaseRequest object that will store the values when adding a new PurchaseRequest
	self.NewPurchaseRequest = {};

	// JQuery function that adds a new purchase request to the database
	self.Add = function(purchaserequest) {
		$http.post("http://localhost:63409/PurchaseRequests/Add", purchaserequest)
			.then(
				// if successful
				function(resp) {
					$location.path("/purchaserequests");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	self.GetUsers = function() {
		$http.get("http://localhost:63409/Users/List")
			.then(
				function(resp) {
					self.Users = resp.data;
				},
				function(err) {
					console.log("ERROR:", err)
				}
			);
	}
	self.GetUsers();

	// JQuery function that deletes a specific purchase request from the database given an ID
	self.Delete = function(id) {
		$http.post("http://localhost:63409/PurchaseRequests/Remove/" + id)
			.then(
				// if successful
				function(resp) {
					$location.path("/purchaserequests");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}
}