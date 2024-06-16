const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.post('/register',vendorController.register);
router.post('/login',vendorController.login);
router.post('/getVendor',vendorController.getVendor);

module.exports = router;