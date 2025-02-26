const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    change_password:{
        type:Number,
        default:1
    },
    role:{
        type: String,
        enum:['admin','guest','secretary','developer'],
        default:'guest'
    },
    password:{
        type:String,
        select:false
     },
})

UserSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.fullname, 10)
    next()
 })

 const User = mongoose.model('User',UserSchema)
 module.exports = User