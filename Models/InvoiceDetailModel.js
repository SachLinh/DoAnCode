const mongoose = require("mongoose")
const Schema = mongoose.Schema

const InvoiceDetailSchema = new Schema({
    ID_Product:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
   Count:{
       type:Number
   }
})

const InvoiceDetail = mongoose.model('InvoiceDetail', InvoiceDetailSchema)
module.exports = InvoiceDetail
