
const Invoice = require('../Models/InvoiceModel')
const Product = require('../Models/ProductModel')


const getAllInvoice = async (req, res, next) =>{
  const invoices = await Invoice.find({})
  return res.status(200).json({invoices})
}
const newInvoice = async (req, res, next) =>{
   const newInvoice = new Invoice(req.body)
   await newInvoice.save()
   return res.status(201).json({newInvoice})
}
const getInvoice = async (req, res, next) =>{

    const {invoiceID} = req.value.params
    const invoice = await Invoice.findById(invoiceID)
    return res.status(200).json({invoice})
}
const updateInvoice = async (req, res, next) => {
    const {invoiceID} = req.params
    // get invoice
    const newInvoice = req.value.body;
    const resulf = await Invoice.findByIdAndUpdate(invoiceID, newInvoice)
    return res.status(201).json({success: true})
};

 module.exports = {
  getAllInvoice, getInvoice, newInvoice,updateInvoice
}