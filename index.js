const express = require('express');
const UserRoute = require('./routes/UserRoute')
const LandRoute = require('./routes/LandRoute')
const SettingRoute = require('./routes/SettingsRoute')
const AuthencateRoute = require('./routes/AuthencationRoute')
const globalErrorHandler = require('./controller/errorController')
const BusinessController = require('./controller/BuinessController')
const CustomError = require('./utils/CustomError')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const port = 3000;


// 'mongodb://localhost:27017/LandDB'

mongoose.connect('mongodb+srv://developer:admindeveloper@cluster0.uyzez.mongodb.net/landDB?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Db connected')
    app.listen( port,()=>{
        console.log('Server is up and running') 
    })

}).catch((err)=>{
    console.log(err)
})

app.use(cors('*'))
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.raw({limit:'25KB'}))
app.use('/api/v1/user',UserRoute)
app.use('/api/v1/land',LandRoute)
app.use('/api/v1/setting',SettingRoute)
app.use('/api/v1/authencation',AuthencateRoute)
app.get('/api/v1/business',BusinessController.getBusinessStat)

app.use(globalErrorHandler)

app.all('*',(req,res,next)=>{
    const err = new CustomError(`can't find ${req.originalUrl} on server`,404)
    next(err)
})