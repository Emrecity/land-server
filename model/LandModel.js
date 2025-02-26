const mongoose = require('mongoose')

const LandSchema = new mongoose.Schema({
    plotNo: String,
    plotsize:String,
    locality:String,
    streetname:String,
    isRegistered:Number||String,
    owners_name:String,
    owners_phone:String,
    owners_gender:{
        type:String,
        enum:['male','female']
    },
    owners_image:{
        type:String,
        default:''
     },
})

const Land = mongoose.model('Land', LandSchema)
module.exports = Land