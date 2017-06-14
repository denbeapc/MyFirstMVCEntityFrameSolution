using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MyFirstMVCEntityFrameProject.Models;

namespace MyFirstMVCEntityFrameProject.Controllers
{
    public class PurchaseRequestLineItemsController : Controller
    {
        private MyFirstMVCEntityFrameProjectContext db = new MyFirstMVCEntityFrameProjectContext();

        // GET: PurchaseRequestLineItems
        public ActionResult Index()
        {
            var lineItems = db.LineItems.Include(p => p.Product).Include(p => p.PurchaseRequest);
            return View(lineItems.ToList());
        }

        // GET: PurchaseRequestLineItems/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequestLineItem purchaseRequestLineItem = db.LineItems.Find(id);
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
                db.LineItems.Add(purchaseRequestLineItem);
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
            PurchaseRequestLineItem purchaseRequestLineItem = db.LineItems.Find(id);
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
            PurchaseRequestLineItem purchaseRequestLineItem = db.LineItems.Find(id);
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
            PurchaseRequestLineItem purchaseRequestLineItem = db.LineItems.Find(id);
            db.LineItems.Remove(purchaseRequestLineItem);
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
