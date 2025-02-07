const express = require('express');
const vendorcontrol = require('../controllers/Vendorcontroller')
const router = express.Router();


router.post('/register',vendorcontrol.vendorcontroller);
router.post('/login',vendorcontrol.vendorlogincontroller);
router.get('/getvendors',vendorcontrol.getallvendors);
router.get('/getvendor/:id',vendorcontrol.getonevendor);

module.exports = router;