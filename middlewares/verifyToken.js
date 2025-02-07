const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const vendormodel = require('../modules/Vendor')
dotenv.config();

const verifytoken = async(req,res,next)=>{

const token = req.headers.token;
if(!token){
  return res.status(401).json({error : "token is required"});
}

try{
  const decoded = jwt.verify(token,process.env.SECRET_KEY);
  const vendor = await vendormodel.findById(decoded.vendorid);
  
  if(!vendor){
    return res.status(404).json({error : "vendor not found"});
  }
  
  req.vendorid = vendor._id;

next()
}
catch(error){
return res.status(500).json({error : "internal server error"});
}

}

module.exports = verifytoken;