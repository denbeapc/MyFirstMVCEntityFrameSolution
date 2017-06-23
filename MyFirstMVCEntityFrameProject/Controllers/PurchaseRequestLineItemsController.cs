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
    public class PurchaseRequestLineItemsController : Controller
    {
        private MyFirstMVCEntityFrameProjectContext db = new MyFirstMVCEntityFrameProjectContext();

        // -------------- IMPORTANT -------------- //
        // RETURNS a list of the PurchaseRequestLineItems to the front end (JQuery) in Json formatting
        public ActionResult List() {
            return Json(db.PurchaseRequestLineItems.ToList(), JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // GETS a specific PurchaseRequestLineItem by ID and returns it to the front end (JQuery) in Json formatting
        public ActionResult Get(int? id) {
            return Json(db.PurchaseRequestLineItems.Find(id), JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // REMOVES a specific PurchaseRequestLineItem by ID
        public ActionResult Remove(int? id) {
            if (id == null || db.PurchaseRequestLineItems.Find(id) == null) {
                return Json(new Msg { Result = "Failed", Message = "Purchase Request Line Item not found" }, JsonRequestBehavior.AllowGet);
            }

            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            db.PurchaseRequestLineItems.Remove(purchaseRequestLineItem);
            db.SaveChanges();
            return Json(new Msg { Result = "OK", Message = "Successfully deleted" }, JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // CREATES a PurchaseRequestLineItem with a passed in PurchaseRequestLineItem object
        public ActionResult Add([Api.FromBody] PurchaseRequestLineItem purchaseRequestLineItem) {
            if (purchaseRequestLineItem == null) {
                return Json(new Msg { Result = "Failure", Message = "Purchase Request Line Item is empty" }, JsonRequestBehavior.AllowGet);
            }
            
            db.PurchaseRequestLineItems.Add(purchaseRequestLineItem);
            try {
                db.SaveChanges();
            } catch (Exception ex) {
                var e = ex;
            }

            return Json(new Msg { Result = "OK", Message = "Successfully added" }, JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // UPDATES a PurchaseRequestLineItem with a passed in PurchaseRequestLineItem object
        public ActionResult Change([Api.FromBody] PurchaseRequestLineItem aPurchaseRequestLineItem) {
            if (aPurchaseRequestLineItem.ID == 0) {
                return Json(new Msg { Result = "Failure", Message = "aPurchaseRequestLineItem is empty" }, JsonRequestBehavior.AllowGet);
            }

            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(aPurchaseRequestLineItem.ID);
            purchaseRequestLineItem.ProductID = aPurchaseRequestLineItem.ProductID;
            purchaseRequestLineItem.PurchaseRequestID = aPurchaseRequestLineItem.PurchaseRequestID;
            purchaseRequestLineItem.Quantity = aPurchaseRequestLineItem.Quantity;

            try {
                db.SaveChanges();
            } catch (Exception ex) {
                var e = ex;
            }

            return Json(new Msg { Result = "OK", Message = "Successfully updated" }, JsonRequestBehavior.AllowGet);
        }

        // GET: PurchaseRequestLineItems
        public ActionResult Index()
        {
            var lineItems = db.PurchaseRequestLineItems.Include(p => p.Product).Include(p => p.PurchaseRequest);
            return View(lineItems.ToList());
        }

        // GET: PurchaseRequestLineItems/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            if (purchaseRequestLineItem == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequestLineItem);
        }

        // GET: PurchaseRequestLineItems/Create
        public ActionResult Create()
        {
            ViewBag.ProductID = new SelectList(db.Products, "ID", "Name");
            ViewBag.PurchaseRequestID = new SelectList(db.PurchaseRequests, "ID", "Description");
            return View();
        }

        // POST: PurchaseRequestLineItems/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,PurchaseRequestID,ProductID,Quantity")] PurchaseRequestLineItem purchaseRequestLineItem)
        {
            if (ModelState.IsValid)
            {
                db.PurchaseRequestLineItems.Add(purchaseRequestLineItem);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ProductID = new SelectList(db.Products, "ID", "Name", purchaseRequestLineItem.ProductID);
            ViewBag.PurchaseRequestID = new SelectList(db.PurchaseRequests, "ID", "Description", purchaseRequestLineItem.PurchaseRequestID);
            return View(purchaseRequestLineItem);
        }

        // GET: PurchaseRequestLineItems/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            if (purchaseRequestLineItem == null)
            {
                return HttpNotFound();
            }
            ViewBag.ProductID = new SelectList(db.Products, "ID", "Name", purchaseRequestLineItem.ProductID);
            ViewBag.PurchaseRequestID = new SelectList(db.PurchaseRequests, "ID", "Description", purchaseRequestLineItem.PurchaseRequestID);
            return View(purchaseRequestLineItem);
        }

        // POST: PurchaseRequestLineItems/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,PurchaseRequestID,ProductID,Quantity")] PurchaseRequestLineItem purchaseRequestLineItem)
        {
            if (ModelState.IsValid)
            {
                db.Entry(purchaseRequestLineItem).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ProductID = new SelectList(db.Products, "ID", "Name", purchaseRequestLineItem.ProductID);
            ViewBag.PurchaseRequestID = new SelectList(db.PurchaseRequests, "ID", "Description", purchaseRequestLineItem.PurchaseRequestID);
            return View(purchaseRequestLineItem);
        }

        // GET: PurchaseRequestLineItems/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            if (purchaseRequestLineItem == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequestLineItem);
        }

        // POST: PurchaseRequestLineItems/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            db.PurchaseRequestLineItems.Remove(purchaseRequestLineItem);
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
