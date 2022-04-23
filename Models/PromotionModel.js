const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PromotionSchema = new Schema({
    value:{
        type:Number
    },
    DateOfStart:{
        type: Date,
        required:true
    },
    DateOfEnd:{
        type: Date
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})
const Promotion = mongoose.model('Promotion', PromotionSchema)
module.exports = Promotion

