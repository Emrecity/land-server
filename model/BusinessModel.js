const mongoose = require('mongoose')

const BusinessModel = new mongoose.Schema({
    businessname:String,
    business_owner:String,
    registered_year:String,  
})

const Business = mongoose.model('Business',BusinessModel)

module.exports = Business