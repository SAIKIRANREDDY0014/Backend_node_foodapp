const vendormodel = require('../modules/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');
const firmmodel = require('../modules/Firm');
dotEnv.config();
const vendorcontroller = async(req,res)=>{

  const {username,email,password} = req.body;

try{
  const emailcheck = await vendormodel.findOne({email});
  if(emailcheck){
   return res.status(400).json("email already taken");
  }
//not completed hashing 
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync({password}, salt);

  const vendorregister = await new vendormodel({
    username,
    email,
   password 
  });
 
  await vendorregister.save();
  res.status(201).json({message : "registered succesfully"});
  console.log('registered');

}
catch(error){
 res.status(500).json({error : "internal server error",error : error.message});
}
}

const vendorlogincontroller = async(req,res)=>{
 const {email,password} = req.body;

 try{
  const checkmail = await vendormodel.findOne({email});
  const checkpass = await vendormodel.findOne({password});
  //decryption (comparing) of password is incomplete
  if(!checkmail || !checkpass){
    return res.status(401).json({error : "invalid mail and password"});
  }
  const token = jwt.sign({vendorid : checkmail._id},process.env.SECRET_KEY,{expiresIn : '1h'});
  res.status(201).json({message : "login successfull",token});
  console.log("login succesfull and token id is: ",token);
 }
 catch(error){
  res.status(500).json({error:error.message})
 }

}

const getallvendors = async(req,res)=>{
try{
  const allvendors = await  vendormodel.find().populate('firm');
  if(!allvendors){
    return res.status(404).json({error: "no data found"});
  }
  res.status(200).json({allvendors});
}
catch(error){
return res.status(500).json({error : "internal server error"});
}

}
const getonevendor = async(req,res)=>{
  const onevendorid = req.params.id; 
  try{
    const onevendor = await vendormodel.findById(onevendorid).populate('firm');
    if(!onevendor){
      return res.status(404).json({error: "no data found"});
    }
    res.status(200).json({onevendor});
  }
  catch(error){
  return res.status(500).json({error : "internal server error"});
  }
  
  }


module.exports =  {vendorcontroller,vendorlogincontroller,getallvendors,getonevendor};