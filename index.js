const mongoose = require("mongoose");
const Dotenv = require("dotenv");
const bodyparser = require('body-parser');
const vendorrouter = require('./routes/Vendorroute');
const firmroutes = require('./routes/Firmroutes')
const productrouter = require("./routes/Productroutes");
const path = require("path");
Dotenv.config();
const express = require("express");
const server = express();

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("database connected succesfully")).catch((error)=>console.log(error));
server.use(bodyparser.json());
server.use('/vendor',vendorrouter);
server.use('/firm',firmroutes)
server.use('/product',productrouter);

server.use('/uploads',express.static('uploads'))
server.listen(process.env.PORT || 4040,()=>{
  console.log(`server listens at ${PORT}`)
});

server.use('/',(req,res)=>{
  res.send("<h1>food delivery App</h1>");
})

