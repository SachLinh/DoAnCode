/** @format */

const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const invoiceController = require('../Controllers/InvoiceController');
const {
	validateBody,
	schemas,
	validateParam,
} = require('../Helper/routerHelper');

router
	.route('/')
	.get(invoiceController.getAllInvoice)
	.post(invoiceController.newInvoice);

router
	.route('/:invoiceID')
	.get(
		validateParam(schemas.invoiceID, 'invoiceID'),
		invoiceController.getInvoice,
	)
	.post(validateBody(schemas.newInvoiceSchema), invoiceController.newInvoice)
	.put(
		validateBody(schemas.newInvoiceOptionSchema),
		invoiceController.updateInvoice,
	)
	.delete(
		validateParam(schemas.invoiceID, 'invoiceID'),
		invoiceController.deleteInvoice,
	);

module.exports = router;
