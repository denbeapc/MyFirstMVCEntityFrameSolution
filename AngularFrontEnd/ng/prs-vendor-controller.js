angular
	.module("PrsApp")
	.controller("VendorCtrl", VendorCtrl);

VendorCtrl.$inject = ["$http", "$routeParams", "$location", "VendorSvc", "SystemSvc"];

function VendorCtrl($http, $routeParams, $location, VendorSvc, SystemSvc) {
	var self = this;
	self.PageTitle = "Vendor";

	SystemSvc.VerifyUserLogin();
	self.AdminRights = SystemSvc.GetAdminRights();

	// JQuery function that retrieves a data list of type Vendor from the database
	VendorSvc.List()
		.then(
			function(resp) {
				self.Vendors = resp.data;
			},
			function(err) {
				self.Vendors = [];
				console.log("[ERROR] ", err);
			}
		);

	self.SelectedVendorID = $routeParams.id;

	// JQuery function that retrieves a specific vendor from the database given an ID
	VendorSvc.Get(self.SelectedVendorID)
		.then(
			function(resp) {
				self.SelectedVendor = resp.data;
			},
			function(err) {
				console.log("[ERROR] ", err);
			}
		);

	// JQuery function that updates a specific vendor from the database given an ID
	self.Update = function(vendor) {
		VendorSvc.Change(vendor)
			.then(
				function(resp) {
					$location.path("/vendors");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}

	self.NewVendor = {};

	// JQuery function that adds a new vendor to the database
	self.Add = function(vendor) {
		VendorSvc.Add(vendor)
			.then(
				function(resp) {
					$location.path("/vendors");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}

	// JQuery function that deletes a specific vendor from the database given an ID
	self.Delete = function(id) {
		$http.post("http://localhost:63409/Vendors/Remove/" + id)
			.then(
				// if successful
				function(resp) {
					$location.path("/vendors");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}
}