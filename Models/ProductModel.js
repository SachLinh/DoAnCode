const number = require('@hapi/joi/lib/types/number')
const object = require('@hapi/joi/lib/types/object')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    ID_Cata:{
        type:Schema.Types.ObjectId,
        ref:'Cata'
    },
    ID_Promotion:{
        type:Schema.Types.ObjectId,
        ref:'Promotion'
    },
    ID_Spec:{
        type:Schema.Types.ObjectId,
        ref:'Specification'
    },
    Name:{
        type:String
    },
    Image:{
        type:String
    },
    Price:{
        type:Number
    },
    Color:{
        type:String
    },
    Endow:{
        type:String
    },
    Count:{
        type:Number
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
