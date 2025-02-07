const express = require('express');
const verifytoken = require('../middlewares/verifyToken');
const firmcontroller = require('../controllers/Firmcontroller');

const router = express.Router();

router.post('/add-firm',verifytoken,firmcontroller.firmcontroller);

router.get('/uploads/:imagename',(req,res) =>{
  const imagename = req.params.imagename;
  res.headersSent('Content-Type','image/jpeg');
  res.sendFile(path.join(__dirname,'..','uploads',imagename));
})


router.get('/deletefirm/:id',firmcontroller.deletefirmfunc);

module.exports = router;
