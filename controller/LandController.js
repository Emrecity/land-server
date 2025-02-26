const Land = require('../model/LandModel')
const Locality = require('../model/LocalityModel')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: 'ductltfwu', 
    api_key: '868473772756656', 
    api_secret: '3n_AnCuOHOWZBBSCNfPTfG1OuYo'
  });



exports.CreateLand = asyncErrorHandler(async(req,res,next)=>{
    const { plotNo,streetname }=req.body
    const LandData = await Land.find()
    const findLand = await LandData?.find((land)=>land.plotNo==plotNo && land.streetname==streetname)
    if(!findLand){

        if(req.file){
            const response = await cloudinary.uploader.upload(req.file.path,{
              folder:'land',
              use_filename:true,
              tags:'land'
             })
          if(response){
            req.body.owners_image = response.secure_url
                      }
        }
    
        const result = await Land.create(req.body)
    
        if(result){
            res.status(200).json({
                status:'Success',
                message:'land created'
            })
        }
        if(!result){
            res.status(400).json({
                status:'failed',
                message:'land creation failed'
            })
        }
        
    }
    if(findLand){
        res.status(404).json({
            status:'Failed',
            message:'land already exist'
        })
    }
})

exports.getAllLand = asyncErrorHandler(async(req,res,next)=>{
    const response = await Land.find()
    if(response){
        res.status(200).json({
            status:'Success',
            data: response
        })
    }
    if(!response){
        res.status(400).json({
            status:'Failed',
            message:'Land not found'
        })
    }
})

exports.deleteLand = asyncErrorHandler(async(req,res,next)=>{
    const response = await Land.findByIdAndDelete(req.params.id)
    if(response){
        res.status(200).json({
            status:'success',
            message:'Land Deleted'
        })
    }
    if(!response){
        res.status(400).json({
            status:'failed',
            message:response
        })
    }

})

exports.getLandStats = asyncErrorHandler(async(req,res,next)=>{
    const response = await Land.find()
    const LocResponse = await Locality.find()
    const reg = response.filter((item)=>item.isRegistered=='1')
    const Unreg = response.filter((item)=>item.isRegistered=='0')
    if(response){
        res.status(200).json({
            status:'Success',
            stats:{
                TotalLands:response.length,
                registered:reg.length,
                unreg:Unreg.length,
                TotalLocality:LocResponse.length
            }
        })
    }
    if(!response){
        res.status(400).json({
            status:'failed',
            message:'Failed to load data'
        })
    }
})

exports.updateLand = asyncErrorHandler(async(req,res,next)=>{
   
    if(req.file){
        const response = await cloudinary.uploader.upload(req.file.path,{
          folder:'land',
          use_filename:true,
          tags:'land'
         })
      if(response){
        req.body.owners_image = response.secure_url
                  }
    }

    const {plotNo,plotsize,locality,streetname,isRegistered,owners_name,owners_phone,owners_gender,owners_image} = req.body
    const result = await Land.findByIdAndUpdate(req.params.id,{$set:{plotNo:plotNo,plotsize:plotsize,locality:locality,streetname:streetname,isRegistered:isRegistered,owners_name:owners_name,owners_phone:owners_phone,owners_gender:owners_gender,owners_image:owners_image}})

    if(result){
        res.status(200).json({
            status:'Success',
            message:'land updated'
        })
    }
    if(!result){
        res.status(400).json({
            status:'failed',
            message:'land update failed'
        })
    }
})