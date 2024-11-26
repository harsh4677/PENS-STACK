require('dotenv').config({path: `${process.cwd()}/.env`})
const express = require('express')
const authRouter = require('./route/authRoute');
const projectRouter = require('./route/projectRoute')
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();
app.use(express.json());


//All routes wil be here 
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/', projectRouter)

app.use('*', 
    catchAsync( async(req, res, next)=>{
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404)
}))

app.use(globalErrorHandler)
const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, ()=>{
    console.log('Server is up and running', PORT)
}); 