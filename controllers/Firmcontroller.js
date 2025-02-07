const vendormodel = require('../modules/Vendor');
const firmmodel = require('../modules/Firm')
const multer = require('multer')
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

const firmcontroller = async(req,res)=>{

try{
  const {firmname,area,category,region,offer} = req.body;
const image = req.file? req.file.filename : undefined;
  const vendordata = await vendormodel.findById(req.vendorid);
  if(!vendordata){
    return res.status(404).json({error : "vendor not found"});
  }

  const firmdata = new firmmodel({
    firmname, 
    area,
    category,
    region,
    offer,
    image,
    vendor : vendordata._id
  });
 
const saveddata = await firmdata.save();

 vendordata.firm.push(saveddata);
 await vendordata.save();

return res.status(200).json({
  message : "firm added successfully"
})
}catch(error){
  console.log(error);
  return res.status(500).json({error : "adding firm failed"})
}

}


const deletefirmfunc = async(req,res) => {
  try{
    const firmid = req.params.id;
    const deletedfirm = await firmmodel.findByIdAndDelete(firmid);
    
   if(!deletedfirm){
    return res.status(404).json({error : "firm not found"});
   }

   res.status(201).json({message : "firm deleted succesfully"});

  }
  catch(error){
    res.status(501).json({error : "internal server error"});
  }
}
module.exports = {firmcontroller : [upload.single('image'),firmcontroller],deletefirmfunc};

