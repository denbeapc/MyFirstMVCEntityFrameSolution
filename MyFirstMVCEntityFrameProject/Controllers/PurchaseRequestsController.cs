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
    public class PurchaseRequestsController : Controller
    {
        private MyFirstMVCEntityFrameProjectContext db = new MyFirstMVCEntityFrameProjectContext();

        // -------------- IMPORTANT -------------- //
        // RETURNS a list of the PurchaseRequest to the front end (JQuery) in Json formatting
        public ActionResult List() {
            return Json(db.PurchaseRequests.ToList(), JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // GETS a specific PurchaseRequest by ID and returns it to the front end (JQuery) in Json formatting
        public ActionResult Get(int? id) {
            return Json(db.PurchaseRequests.Find(id), JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // REMOVES a specific PurchaseRequest by ID
        public ActionResult Remove(int? id) {
            if (id == null || db.PurchaseRequests.Find(id) == null) {
                return Json(new Msg { Result = "Failed", Message = "Purchase Request not found" }, JsonRequestBehavior.AllowGet);
            }

            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            db.PurchaseRequests.Remove(purchaseRequest);
            db.SaveChanges();
            return Json(new Msg { Result = "OK", Message = "Successfully deleted" }, JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // CREATES a PurchaseRequest with a passed in PurchaseRequest object
        public ActionResult Add([Api.FromBody] PurchaseRequest purchaseRequest) {
            if (purchaseRequest == null) {
                return Json(new Msg { Result = "Failure", Message = "Purchase Request is empty" }, JsonRequestBehavior.AllowGet);
            }

            purchaseRequest.DateNeeded = Convert.ToDateTime(purchaseRequest.DateNeeded);
            purchaseRequest.SubmittedDate = Convert.ToDateTime(purchaseRequest.SubmittedDate);
            db.PurchaseRequests.Add(purchaseRequest);
            try {
                db.SaveChanges();
            } catch (Exception ex) {
                var e = ex;
            }

            return Json(new Msg { Result = "OK", Message = "Successfully added" }, JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // UPDATES a PurchaseRequest with a passed in PurchaseRequest object
        public ActionResult Change([Api.FromBody] PurchaseRequest aPurchaseRequest) {
            if (aPurchaseRequest.ID == 0) {
                return Json(new Msg { Result = "Failure", Message = "aPurchaseRequest is empty" }, JsonRequestBehavior.AllowGet);
            }

            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(aPurchaseRequest.ID);
            purchaseRequest.UserID = aPurchaseRequest.UserID;
            purchaseRequest.Description = aPurchaseRequest.Description;
            purchaseRequest.Justification = aPurchaseRequest.Justification;
            purchaseRequest.DateNeeded = aPurchaseRequest.DateNeeded;
            purchaseRequest.DeliveryMode = aPurchaseRequest.DeliveryMode;
            purchaseRequest.DocsAttached = aPurchaseRequest.DocsAttached;
            purchaseRequest.Status = aPurchaseRequest.Status;
            purchaseRequest.Total = aPurchaseRequest.Total;
            purchaseRequest.SubmittedDate = aPurchaseRequest.SubmittedDate;

            db.SaveChanges();

            return Json(new Msg { Result = "OK", Message = "Successfully updated" }, JsonRequestBehavior.AllowGet);
        }

        // GET: PurchaseRequests
        public ActionResult Index()
        {
            var purchaseRequests = db.PurchaseRequests.Include(p => p.User);
            return View(purchaseRequests.ToList());
        }

        // GET: PurchaseRequests/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            if (purchaseRequest == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequest);
        }

        // GET: PurchaseRequests/Create
        public ActionResult Create()
        {
            ViewBag.UserID = new SelectList(db.Users, "ID", "UserName");
            return View();
        }

        // POST: PurchaseRequests/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Description,Justification,DateNeeded,DeliveryMode,DocsAttached,Status,Total,SubmittedDate,UserID")] PurchaseRequest purchaseRequest)
        {
            if (ModelState.IsValid)
            {
                db.PurchaseRequests.Add(purchaseRequest);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.UserID = new SelectList(db.Users, "ID", "UserName", purchaseRequest.UserID);
            return View(purchaseRequest);
        }

        // GET: PurchaseRequests/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            if (purchaseRequest == null)
            {
                return HttpNotFound();
            }
            ViewBag.UserID = new SelectList(db.Users, "ID", "UserName", purchaseRequest.UserID);
            return View(purchaseRequest);
        }

        // POST: PurchaseRequests/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Description,Justification,DateNeeded,DeliveryMode,DocsAttached,Status,Total,SubmittedDate,UserID")] PurchaseRequest purchaseRequest)
        {
            if (ModelState.IsValid)
            {
                db.Entry(purchaseRequest).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.UserID = new SelectList(db.Users, "ID", "UserName", purchaseRequest.UserID);
            return View(purchaseRequest);
        }

        // GET: PurchaseRequests/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            if (purchaseRequest == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequest);
        }

        // POST: PurchaseRequests/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            db.PurchaseRequests.Remove(purchaseRequest);
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
