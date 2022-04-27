const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const invoiceController = require("../Controllers/InvoiceController");
const {
  validateBody,
  schemas,
  validateParam,
} = require("../Helper/routerHelper");

router
  .route("/")
  .get(invoiceController.getAllInvoice)
  .post(invoiceController.newInvoice);

router
  .route("/:invoiceID")
  .get(invoiceController.getInvoice)
  .post(validateBody(schemas.newInvoiceSchema), invoiceController.newInvoice)
  .put(
    validateBody(schemas.newInvoiceOptionSchema),
    invoiceController.updateInvoice
  );
router
  .route("/:invoiceID/invoiceDetail")
  .post(
    validateBody(schemas.newInvoiceDetailSchema),
    invoiceController.newDetailByInvoice
  );

module.exports = router;
