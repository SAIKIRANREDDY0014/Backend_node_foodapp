const express = require("express");
const productcontroller = require("../controllers/Productcontroller");

const router = express.Router();

router.post('/addproduct/:id',productcontroller.productcontrollerfunc);
router.get('/getfirmproducts/:id',productcontroller.getproductfunc);

router.get('/uploads/:imagename',(req,res) =>{
  const imagename = req.params.imagename;
  res.headersSent('Content-Type','image/jpeg');
  res.sendFile(path.join(__dirname,'..','uploads',imagename));
})

router.get('/removeproduct/:id',productcontroller.deleteproductfunc);
module.exports = router;