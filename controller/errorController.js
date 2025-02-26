const CustomError = require('../utils/CustomError')

const duplicateErrorHandler = (err)=>{
    let name = err.keyValue.name
    let msg = `Item ${name} already exist`
  return new CustomError(msg,400)
}

const castErrorHandler = (err)=>{
    let msg = `Invalid value for ${err.path}: ${err.value}`
    return new CustomError(msg,400)
}

const prodError = (res,error)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status:error.status,
            message:error.message
        })
    }else{
        res.status(500).json({
            status:'error',
            message:'Something went wrong! Please try again later'
        })
    }
}

module.exports =(error,req,res,next)=>{
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'
    if(error.code ==11000)error = duplicateErrorHandler(error)
    if(error.name == 'CastError') error = castErrorHandler(error)
    prodError(res,error)
}