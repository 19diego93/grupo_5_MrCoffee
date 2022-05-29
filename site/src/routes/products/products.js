const express = require("express");
const router = express.Router();
const path = require("path");
const productsCrontroller = require(path.join(__dirname,"/../../controllers/productsController"));

router.get("/productCart", productsCrontroller.productCart);

router.get("/productDetail", productsCrontroller.productDetail);

router.get("/shop", productsCrontroller.shop);

module.exports = router;
