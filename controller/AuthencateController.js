const asyncErrorHandler = require('../utils/asyncErrorHandler')
const User = require('../model/UserModel')
const bcrypt = require('bcryptjs')

exports.login = asyncErrorHandler(async(req,res,next)=>{
    const data = req.body
    const response = await User.findOne({email:data?.email}).select('password')
    if (response){
        if(response && (await bcrypt.compare(data?.password,response.password))){
            const user = await User.findById(response._id)
              res.json({
                  status:'success',
                  data:user
              })
          }
        if(response && !(await bcrypt.compare(data?.password,response.password))){
              res.status(404).json({
                  status:'failed',
                  message:'Incorrect password'
              })
          }
    }
    if(!response){
        res.status(404).json({
            status:'Failed',
            message:'No user found'
        })
    }

})

exports.changePassword = asyncErrorHandler(async(req,res,next)=>{
    const upassword = await bcrypt.hash(req.body.password,10)
    const response = await User.findByIdAndUpdate(req.params.id,{$set:{password:upassword,change_password:0}})
    if(response){
        res.status(200).json({
            status:'Success',
            message:'Password changed successfully'
        })
    }
    if(!response){
        res.status(404).json({
            status:'Failed',
            message:'Incorrect user id'
        })
    }
})

exports.forgotPassword = asyncErrorHandler(async(req,res,next)=>{
    const response = await User.findOne({email:req.body.email})
    if(response){
        res.status(200).json({
            status:'Success',
            id:response._id,
        })
    }
    if(!response){
        res.status(404).json({
            status:'Failed',
            message:'No user found'
        })
    }
})