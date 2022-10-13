import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import redis from 'redis';

import userRoute from './app/router/users.js';

//mongoose connection 
const connect  = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/newposapi');
        console.log('Connected To MongoDB');
    } catch (error) {
        console.log(error);
        throw error;
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });




const app = express();

app.use(cors());

// request of content type application json
app.use(bodyParser.json());

// request of content type application/x-www-form-urlcode
app.use(bodyParser.urlencoded({extended:true}));

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.get('/', (req, res) =>{
    res.send({
        message: 'Welcome Api integration Code'
    })
})

// router


app.use('/api/users', userRoute);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})





// set port listing for requetst
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    connect();
    console.log(`server is running on port ${PORT}`)
})