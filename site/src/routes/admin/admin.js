const express = require("express");
const router = express.Router();
const path = require("path");
const adminController = require(path.join(__dirname,"/../../controllers/adminController"));

router.get('/admin', adminController.createProducts)

module.exports = router;
