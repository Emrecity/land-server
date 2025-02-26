const asyncErrorHandler = require('../utils/asyncErrorHandler')
const Business = require('../model/BusinessModel')
const Land = require('../model/LandModel')
const User = require('../model/UserModel')

exports.CreateBusiness = asyncErrorHandler( async(req,res,next)=>{
    const response = await Business.create(req.body)
    if(response){
        res.status(201).json({
            status:'Success',
            message:'Business created successfully',
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

exports.getBusiness = asyncErrorHandler(async(req,res,next)=>{
    const response = await Business.find()
    if(response){
        res.status(200).json({
            status:'Success',
            data: response
        })
    }
    if(!response){
        res.status(404).json({
            status:'Failed',
            message:'Failed to load'
        })
    }
})

exports.UpdateBusiness = asyncErrorHandler(async(req,res,next)=>{
    const {id,businessname,business_owner,registered_year} = req.body
    const response = await Business.findByIdAndUpdate(id,{$set:{businessname:businessname,business_owner:business_owner,registered_year:registered_year}})
    if(response){
        res.status(200).json({
            status:'Success',
            message:'Updated successfully',
            data:response
        })
    }
})

exports.deleteBusiness = asyncErrorHandler(async(req,res,next)=>{
    const response = await  Business.findByIdAndDelete(req.params?.id)
    if(response){
        res.status(200).json({
            status:'Success',
            message:'Deleted successfully'
        })
    }
    if(!response){
        res.status(404).json({
            status:'Failed',
            message:'Invaild data'
        })
    }
})

exports.getBusinessStat =asyncErrorHandler(async(req,res,next)=>{
        const LandData = await Land.find()
        const UserData = await User.find()
        const regLand = await LandData?.filter((land)=>land.isRegistered=='1')
        const AdUser = await UserData?.filter((user)=>user.role == 'admin')
        if(LandData && UserData){
            res.status(200).json({
                status:'Success',
                stats:{
                    TotalLand: LandData.length,
                    TotalUser:UserData.length,
                    Registerlands:regLand.length,
                    Admins:AdUser.length
                },
                data:{
                    lands:regLand,
                    admins:AdUser
                }
            })
        }
})