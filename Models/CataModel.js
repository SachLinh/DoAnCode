const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CataSchema = new Schema({
    name:{
        type: String
    },
    products:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }]
})

const Cata = mongoose.model('Cata', CataSchema)
module.exports = Cata
