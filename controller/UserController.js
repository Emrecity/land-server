const User = require('../model/UserModel')
const asyncErrorHandler = require('../utils/asyncErrorHandler')

exports.createUser = asyncErrorHandler(async (req,res,next)=>{
    const NewUser = await User.create(req?.body)
    if(NewUser){
        res.status(201).json({
            status:'Success',
            message:'User Created',
            data: NewUser
        })
    }
})

exports.getAllUsers = asyncErrorHandler(async(req,res,next)=>{
    const response = await User.find()
    if(response){
        res.status(200).json({
            status:'Success',
            data:response
        })
    }
    if(!response){
        res.status(404).json({
            status:'Failed',
            message:'No User Found'
        })
    }
})

exports.updateUser = asyncErrorHandler(async(req,res,next)=>{
    const id = req.params.id
    const {fullname,email,role} = req.body
    const response = await User.findByIdAndUpdate(id,{$set:{fullname:fullname,email:email,role:role}})
    if(response){
     res.status(200).json({
         status:'success',
         message:'User updated successfully'
     })
    }
    if(!response){
     res.status(400).json({
         status:'failed',
         message: response
     })
    }
 })
 
 exports.deleteUser = asyncErrorHandler(async(req,res,next)=>{
    const response = await User.findByIdAndDelete(req.params.id)
    if(response){
        res.status(200).json({
            status:'success',
            message:'User Deleted'
        })
    }
    if(!response){
        res.status(400).json({
            status:'failed',
            message:response
        })
    }
})

exports.getOneUser = asyncErrorHandler(async(req,res,next)=>{
    const response = await User.findById(req.params.id)
    if(response){
        res.status(200).json({
            status:'success',
            data: response
        })
    }
    if(!response){
        res.status(400).json({
            status:'Failed',
            message:'No User Found'
        })
    }
})

exports.getStats = asyncErrorHandler(async(req,res,next)=>{
   const response = await User.find()
   if(response){
    const admin = response.filter((list)=>list.role=='admin')
    const guest = response.filter((list)=>list.role=='guest')
    const secretary = response.filter((list)=>list.role=='secretary')
    res.status(200).json({
        status:'Success',
        message:'This is the users stats',
        stats:{
            TotalUsers:response.length,
            TotalAdmin:admin.length,
            TotalGuest:guest.length,
            TotalSec:secretary.length
        },
        data:{
            admins:admin,
            guests:guest,
            sec:secretary
        }
    })
   }
})