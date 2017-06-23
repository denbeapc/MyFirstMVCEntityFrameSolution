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
    public class ProductsController : Controller
    {
        private MyFirstMVCEntityFrameProjectContext db = new MyFirstMVCEntityFrameProjectContext();

        // -------------- IMPORTANT -------------- //
        // RETURNS a list of the Product to the front end (JQuery) in Json formatting
        public ActionResult List() {
            return Json(db.Products.ToList(), JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // GETS a specific Product by ID and returns it to the front end (JQuery) in Json formatting
        public ActionResult Get(int? id) {
            return Json(db.Products.Find(id), JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // REMOVES a specific Product by ID
        public ActionResult Remove(int? id) {
            if (id == null || db.Products.Find(id) == null) {
                return Json(new Msg { Result = "Failed", Message = "Product not found" }, JsonRequestBehavior.AllowGet);
            }

            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
            return Json(new Msg { Result = "OK", Message = "Successfully deleted" }, JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // CREATES a Product with a passed in Product object
        public ActionResult Add([Api.FromBody] Product product) {
            if (product == null) {
                return Json(new Msg { Result = "Failure", Message = "aUser is empty" }, JsonRequestBehavior.AllowGet);
            }

            db.Products.Add(product);
            try {
                db.SaveChanges();
            } catch (Exception ex) {
                var e = ex;
            }

            return Json(new Msg { Result = "OK", Message = "Successfully added" }, JsonRequestBehavior.AllowGet);
        }

        // -------------- IMPORTANT -------------- //
        // UPDATES a Product with a passed in Product object
        public ActionResult Change([Api.FromBody] Product aProduct) {
            if (aProduct.ID == 0) {
                return Json(new Msg { Result = "Failure", Message = "aUser is empty" }, JsonRequestBehavior.AllowGet);
            }

            Product product = db.Products.Find(aProduct.ID);
            product.VendorID = aProduct.VendorID;
            product.Name = aProduct.Name;
            product.VendorPartNumber = aProduct.VendorPartNumber;
            product.Price = aProduct.Price;
            product.Unit = aProduct.Unit;
            product.Photopath = aProduct.Photopath;

            try {
                db.SaveChanges();
            } catch (Exception ex) {
                var e = ex;
            }

            return Json(new Msg { Result = "OK", Message = "Successfully updated" }, JsonRequestBehavior.AllowGet);
        }

        // GET: Products
        public ActionResult Index() {
            var products = db.Products.Include(p => p.Vendor);
            return View(products.ToList());
        }

        // GET: Products/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // GET: Products/Create
        public ActionResult Create()
        {
            ProductEditView pev = new ProductEditView {
                Vendors = db.Vendors.ToList()
            };

            return View(pev);
        }

        // POST: Products/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Name,VendorPartNumber,Price,Unit,Photopath,VendorID")] ProductEditView pev)
        {
            Product product = new Product {
                ID = pev.ID,
                VendorID = pev.VendorID,
                Name = pev.Name,
                VendorPartNumber = pev.VendorPartNumber,
                Price = pev.Price,
                Unit = pev.Unit,
                Photopath = pev.Photopath
            };

            if (ModelState.IsValid)
            {
                db.Products.Add(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            
            return View(product);
        }

        // GET: Products/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }

            ProductEditView pev = new ProductEditView {
                ID = product.ID,
                Name = product.Name,
                VendorPartNumber = product.VendorPartNumber,
                Price = product.Price,
                Unit = product.Unit,
                Photopath = product.Photopath,
                VendorID = product.VendorID,
                Vendors = db.Vendors.ToList()
            };
            
            // ViewBag.VendorID = new SelectList(db.Vendors, "ID", "Code", product.VendorID);
            return View(pev);
        }

        // POST: Products/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,VendorID,Name,VendorPartNumber,Price,Unit,Photopath")] ProductEditView pev)
        {
            Product product = new Product {
                ID = pev.ID,
                VendorID = pev.VendorID,
                Name = pev.Name,
                VendorPartNumber = pev.VendorPartNumber,
                Price = pev.Price,
                Unit = pev.Unit,
                Photopath = pev.Photopath
            };

            if (ModelState.IsValid)
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(product);
        }

        // GET: Products/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // POST: Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
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
