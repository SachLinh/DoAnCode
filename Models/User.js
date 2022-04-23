const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcript = require('bcryptjs')

const UserSchema = new Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String, 
        required:true
    }
})

// ma hoa password
UserSchema.pre('save', async function(next){
    try {
        // generate a salt
        const salt = await bcript.genSalt(10)
        // genertae a pass hash (salt + hash)
        const passwordHash = await bcript.hash(this.password, salt)
        // re-asign password
        this.password = passwordHash
    } catch (error) {
        next(error)
    }
})

// Compare password nhap vao
UserSchema.methods.isValidPassword = async function(newPassword){
    try {
        return await bcript.compare(newPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model('User', UserSchema)
module.exports = User


