const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const invoiceDetailController = require("../Controllers/InvoiceDetailController");
const {
    validateBody,
    schemas,
    validateParam,
  } = require("../Helper/routerHelper");
  
router
  .route("/")
  .get(invoiceDetailController.getAllInvoiceDetail)
  .post(validateBody(schemas.newInvoiceDetailSchema),
  invoiceDetailController.newInvoiceDetail);

router
  .route("/:invoiceDetailID")
  .get(invoiceDetailController.getInvoiceDetail)

module.exports = router;
