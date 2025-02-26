const asyncErrorHandler = require('../utils/asyncErrorHandler')
const Locality = require('../model/LocalityModel')

exports.createLocality = asyncErrorHandler(async(req,res,next)=>{
    const response = await Locality.create(req.body)
    if(response){
        res.status(201).json({
            status:'Success',
            message:'Locality created successfully',
            data:response
        })
    }
    if(!response){
        res.status(204).json({
            status:'Failed',
            message:'Unprocess content'
        })
    }
})

exports.getAllLocality = asyncErrorHandler(async(req,res,next)=>{
    const response = await Locality.find()
    if(response){
        res.status(200).json({
            status:'success',
            data: response
        })
    }
    if(!response){
        res.status(404).json({
            status:'Failed',
            message:'No locality found'
        })
    }
})

exports.updateLocality = asyncErrorHandler(async(req,res,next)=>{
    const id = req.params.id
    const data = req.body
    const newLocality = await Locality.updateOne({_id:id},{$set:data},{new:true})
    res.status(200).json({
      status:'success',
      data:newLocality
    })
})

exports.deleteLocality = asyncErrorHandler( async (req,res,next)=>{
    const id = req.params.id
    const newLocality = await Locality.deleteOne({_id:id})
    res.status(200).json({
      status:'success',
      data:newLocality
    })
})

exports.createLocalityStreet = asyncErrorHandler( async (req,res,next)=>{
    const id = req.params.id
    const data = req.body
    const newStreet = await Locality.updateOne({_id:id},{$addToSet:{streets:data}})
    res.status(201).json({
      status:'success',
      data:newStreet
    })
})

exports.updateLocalityStreet = asyncErrorHandler( async (req,res,next)=>{
    const id = req.params.id
    const data = req.body
    const street = await Locality.updateOne({"streets._id":id},{$set:{"streets.$.name":data.name,"streets.$.status":data.status}},{new:true})
    res.status(200).json({
      status:'success',
      data:street
    })
})

exports.deleteLocalityStreet = asyncErrorHandler(async(req,res,next)=>{
    const id = req.params.id
    const request = await Locality.updateOne({'streets._id':id},{$pull:{streets:{_id:id}}})
    res.status(200).json({
        status: 'success',
        data: request
    })
})