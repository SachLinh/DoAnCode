
const InvoiceDetail = require('../Models/InvoiceDetailModel')


const getAllInvoiceDetail = async (req, res, next) =>{
  const invoiceDetails = await InvoiceDetail.find({})
  return res.status(200).json({invoiceDetails})
}
const newInvoiceDetail = async (req, res, next) =>{
   const newInvoiceDetail = new InvoiceDetail(req.value.body)
   await newInvoiceDetail.save()
   return res.status(201).json({newInvoiceDetail})
}

const getInvoiceDetail = async (req, res, next) =>{
    const invoiceDetail = await InvoiceDetail.find(req.params)
    return res.status(200).json({invoiceDetail})
}
 module.exports = {
  getAllInvoiceDetail, getInvoiceDetail, newInvoiceDetail
}