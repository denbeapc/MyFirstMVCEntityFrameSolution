angular
	.module('PrsApp')
	.controller('PurchaseOrderCtrl', PurchaseOrderCtrl);

PurchaseOrderCtrl.$inject = ["$routeParams", "$location", 'SystemSvc', 'PurchaseRequestLineItemSvc', 'VendorSvc'];

function PurchaseOrderCtrl($routeParams, $location, SystemSvc, PurchaseRequestLineItemSvc, VendorSvc) {
	var self = this;

	self.AdminRights = SystemSvc.GetAdminRights();
	self.SelectedVendorId = $routeParams.id;
	self.PageTitle = "Purchase Order";

	self.CreatePoForVendor = function(id) {
		self.PO = {};
		self.PO.Customer = SystemSvc.GetActiveUser();
		VendorSvc.Get(id).then(
			function(resp) {
				self.PO.Vendor = resp.data;
			},
			function(err) {
				console.error(err);
			}
		);
		
		VendorSvc.CreatePurchaseOrder(id).then(
				function(resp) {
					var purchaseRequestLineItemsForVendor = resp.data.purchaseOrder;
					self.PO.LineItems = resp.data.poLines;
					self.PO.Cost = resp.data.poCosts;
				},
				function(err) {
					console.error(err);
				}
			);
	};
	self.CreatePoForVendor(self.SelectedVendorId);
};