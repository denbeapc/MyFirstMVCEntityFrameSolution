using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MyFirstMVCEntityFrameProject.Models;
using Api = System.Web.Http;

namespace MyFirstMVCEntityFrameProject.Controllers
{
    public class VendorsController : Controller
    {
        private MyFirstMVCEntityFrameProjectContext db = new MyFirstMVCEntityFrameProjectContext();

        // -------------- IMPORTANT -------------- //
        // 
        public ActionResult CreatePurchaseOrder(int? id) {
            var purchaseOrder = db.PurchaseRequestLineItems.Where(li => li.Product.VendorID == id).ToList();

            decimal Subtotal = 0; decimal Tax = 0; decimal Shipping = 0; decimal Total = 0;
            for(int idx = 0; idx < purchaseOrder.Count; idx++) {
                Subtotal += purchaseOrder[idx].LineTotal;
            }
            Tax = Subtotal * Convert.ToDecimal(0.1);
            Shipping = Subtotal * Convert.ToDecimal(0.05);
            Total = Tax + Shipping + Subtotal;
            var poCosts = new { Subtotal, Tax, Shipping, Total };

            return Json(new { purchaseOrder, poCosts }, JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // RETURNS a list of the Vendors to the front end (JQuery) in Json formatting
        public ActionResult List() {
            return Json(db.Vendors.ToList(), JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // GETS a specific Vendor by ID and returns it to the front end (JQuery) in Json formatting
        public ActionResult Get(int? id) {
            return Json(db.Vendors.Find(id), JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // REMOVES a specific Vendor by ID
        public ActionResult Remove(int? id) {
            if (id == null || db.Vendors.Find(id) == null) {
                return Json(new Msg { Result = "Failed", Message = "Vendor not found" }, JsonRequestBehavior.AllowGet);
            }

            Vendor vendor = db.Vendors.Find(id);
            db.Vendors.Remove(vendor);
            db.SaveChanges();
            return Json(new Msg { Result = "OK", Message = "Successfully deleted" }, JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // CREATES a Vendor with a passed in Vendor object
        public ActionResult Add([Api.FromBody] Vendor vendor) {
            if (vendor == null) {
                return Json(new Msg { Result = "Failure", Message = "Vendor is empty" }, JsonRequestBehavior.AllowGet);
            }

            db.Vendors.Add(vendor);
            try {
                db.SaveChanges();
            } catch (Exception ex) {
                var e = ex;
            }

            return Json(new Msg { Result = "OK", Message = "Successfully added" }, JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // UPDATES a Vendor with a passed in Vendor object
        public ActionResult Change([Api.FromBody] Vendor aVendor) {
            if (aVendor.ID == 0) {
                return Json(new Msg { Result = "Failure", Message = "aVendor is empty" }, JsonRequestBehavior.AllowGet);
            }

            Vendor vendor = db.Vendors.Find(aVendor.ID);
            vendor.Code = aVendor.Code;
            vendor.Name = aVendor.Name;
            vendor.Address = aVendor.Address;
            vendor.City = aVendor.City;
            vendor.State = aVendor.State;
            vendor.Zip = aVendor.Zip;
            vendor.Phone = aVendor.Phone;
            vendor.Email = aVendor.Email;
            vendor.IsRecommended = aVendor.IsRecommended;

            try {
                db.SaveChanges();
            } catch (Exception ex) {
                var e = ex;
            }

            return Json(new Msg { Result = "OK", Message = "Successfully updated" }, JsonRequestBehavior.AllowGet);
        }

        // GET: Vendors
        public ActionResult Index()
        {
            return View(db.Vendors.ToList());
        }

        // GET: Vendors/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Vendor vendor = db.Vendors.Find(id);
            if (vendor == null)
            {
                return HttpNotFound();
            }
            return View(vendor);
        }

        // GET: Vendors/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Vendors/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Code,Name,Address,City,State,Zip,Phone,Email,IsRecommended")] Vendor vendor)
        {
            if (ModelState.IsValid)
            {
                db.Vendors.Add(vendor);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(vendor);
        }

        // GET: Vendors/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Vendor vendor = db.Vendors.Find(id);
            if (vendor == null)
            {
                return HttpNotFound();
            }
            return View(vendor);
        }

        // POST: Vendors/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Code,Name,Address,City,State,Zip,Phone,Email,IsRecommended")] Vendor vendor)
        {
            if (ModelState.IsValid)
            {
                db.Entry(vendor).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(vendor);
        }

        // GET: Vendors/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Vendor vendor = db.Vendors.Find(id);
            if (vendor == null)
            {
                return HttpNotFound();
            }
            return View(vendor);
        }

        // POST: Vendors/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Vendor vendor = db.Vendors.Find(id);
            db.Vendors.Remove(vendor);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
