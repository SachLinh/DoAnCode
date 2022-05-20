/** @format */

const Invoice = require('../Models/InvoiceModel');
const PdfPriter = require('pdfmake')
var fonts = {
	Roboto: {
	  normal: 'fonts/Roboto-Regular.ttf',
	  bold: 'fonts/Roboto-Medium.ttf',
	  italics: 'fonts/Roboto-Italic.ttf',
	  bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};
var priter = new PdfPriter(fonts)
var fs = require('fs')





const getAllInvoice = async (req, res, next) => {
	const invoices = await Invoice.find({});
	return res.status(200).json({ invoices });
};
const newInvoice = async (req, res, next) => {
	const newInvoice = new Invoice(req.body);
	await newInvoice.save();
	return res.status(201).json({ newInvoice });
};
const getInvoice = async (req, res, next) => {
	const { invoiceID } = req.value.params;
	const invoice = await Invoice.findById(invoiceID);
	return res.status(200).json({ invoice });
};
const updateInvoice = async (req, res, next) => {
	const { invoiceID } = req.params;
	// get invoice
	const newInvoice = req.value.body;
	const resulf = await Invoice.findByIdAndUpdate(invoiceID, newInvoice);
	return res.status(201).json({ success: true });
};
const deleteInvoice = async (req, res, next) => {
	const { invoiceID } = req.value.params;
	// get invoice
	const resulf = await Invoice.findById(invoiceID);
	await resulf.remove();
	return res.status(201).json({ success: true });
};
// in hóa đơn
const printeInvoice =  (req, res, next) => {
	var documentDefinition = {
		content: [
			`bagcjshakakajaj`
		]
	}
	const pdfDoc = priter.createPdfKitDocument(documentDefinition)
	pdfDoc.pipe(fs.createWriteStream('document.pdf'));
	pdfDoc.end()
}


module.exports = {
	getAllInvoice,
	getInvoice,
	newInvoice,
	updateInvoice,
	deleteInvoice,
	printeInvoice
};
