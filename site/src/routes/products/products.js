const express = require("express");
const router = express.Router();
const path = require("path");
const productsCrontroller = require(path.join(
  __dirname,
  "/../../controllers/productsController"
));

router.get("/", productsCrontroller.productShop);

router.get("/productCart", productsCrontroller.productCart);

router.get("/", productsCrontroller.productDetail);

module.exports = router;
