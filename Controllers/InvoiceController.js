
const Invoice = require('../Models/InvoiceModel')
const InvoiceDetail = require('../Models/InvoiceDetailModel')
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
    const invoice = await Invoice.find(req.params)
    return res.status(200).json({invoice})
}
const newDetailByInvoice = async (req, res, next) => {
    const {invoiceID} = req.params
    // Tao new detail
    const newDetail = await InvoiceDetail(req.value.body)
    // get invoice
    const InvoiceOriginal = await Invoice.findById(invoiceID)
    // dua detail vao trong Invoice
    InvoiceOriginal.ID_InvoiceDetail.push(newDetail._id)
    // Tinh lai toatl
    const product = await Product.findById(newDetail.ID_Product)

    InvoiceOriginal.Total = parseInt(InvoiceOriginal.Total) + parseInt(product.Price)*parseInt(newDetail.Count)
    await InvoiceOriginal.save()
    return res.status(201).json({invoiceDetail: newDetail})
};
const updateInvoice = async (req, res, next) => {
    const {invoiceID} = req.params
    // get invoice
    const newInvoice = req.value.body;
    const resulf = await Invoice.findByIdAndUpdate(invoiceID, newInvoice)
    return res.status(201).json({success: true})
};

 module.exports = {
  getAllInvoice, getInvoice, newInvoice,newDetailByInvoice,updateInvoice
}