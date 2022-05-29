const express = require("express");
const router = express.Router();
const path = require("path");
const productController = require(path.join(__dirname,"/../../controllers/productController"));

router.get("/productCart", productController.cart);

module.exports= router;