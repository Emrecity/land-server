const mongoose = require('mongoose')

const StreetModal = new mongoose.Schema({
    name:String,
    status:String,
})
const LocalityModal = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    status:String,
    streets:{
        type:[StreetModal]
    }
})

const Locality = mongoose.model('Locality', LocalityModal)

module.exports = Locality