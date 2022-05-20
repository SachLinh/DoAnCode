/** @format */

const Invoice = require('../Models/InvoiceModel');
var pdfMake = require('./pdfmake/pdfmake');
var pdfFonts = require('./pdfmake/vfs_fonts');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
const printeInvoice = async (req, res, next) => {
	const { invoiceID } = req.params;
	const invoice = await Invoice.findById(invoiceID);
	var documentDefinition = {
		content: [
			`bagcjshakakajaj`
		]
	}
	const pdfDoc = pdfMake.createPdf(documentDefinition)
	pdfDoc.getBase64((data) =>{
		res.writeHead(200, 
			{
				'Content-Type': 'application/pdf',
				'Content-Disposition':'attachment;filename="filename.pdf"'
			});
		const download = Buffer.from(data.toString('utf-8'), 'base64')
		console.log('linh linh');
		res.end(download)
	})
	//console.log('invoice', invoice);
}


module.exports = {
	getAllInvoice,
	getInvoice,
	newInvoice,
	updateInvoice,
	deleteInvoice,
	printeInvoice
};
