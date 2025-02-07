const productmodel = require("../modules/Product");
const firmmodel = require('../modules/Firm')
const multer = require('multer');
const { findById } = require("../modules/Vendor");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = '../uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create directory if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure multer middleware
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});
const productcontrollerfunc = async(req,res)=>{
try{
const {productname,price,bestseller,description,category} = req.body;
const image = req.file? req.file.filename : undefined;

const firmid = req.params.id;
const firmiddb = await firmmodel.findById(firmid);
if(!firmiddb){
  return res.status(404).json({error : "firm not found"});
}

const productdata = new productmodel({
  productname,price,bestseller,description,category,image,firm : firmiddb._id
})
 const saveddata = await productdata.save();
 firmiddb.products.push(saveddata);
  await firmiddb.save();
  res.status(201).json({"message" : "product added successfuly"});
}
catch(error){
  console.error(error);
  res.json({error : "internal server error"});
}
}

const getproductfunc = async(req,res)=>{
try{
const firmid = req.params.id; 
const firm = await firmmodel.findById(firmid);
if(!firm){
  return res.json({error : "firm not found"});
}

const productsall = await productmodel.find({firm : firmid});
res.status(201).json(productsall);
}
catch(error){
res.json({error : "internal server error"});
}
}


const deleteproductfunc = async(req,res) => {
  try{
    const productid = req.params.id;
    const deletedproduct = await productmodel.findByIdAndDelete(productid);
   if(!deletedproduct){
    return res.status(404).json({error : "product not found"});
   }

   res.status(201).json({message : "product deleted succesfully"});

  }
  catch(error){
    res.status(501).json({error : "internal server error"});
  }
}

module.exports = {productcontrollerfunc : upload.single('image'),productcontrollerfunc,getproductfunc,deleteproductfunc};


// {
//   "productname" : "mutton biriyani",
//   "price" : "400",
//   "bestseller" : "yes",
//   "description" : "tasty chicken",
//   "category"  : "non-veg",
//   "image" : "examp.jpg"
// }