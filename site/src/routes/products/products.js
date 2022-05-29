const express = require("express");
const router = express.Router();
const path = require("path");
const productsCrontroller = require(path.join(
  __dirname,
  "/../../controllers/productsController"
));

router.get("/", productsCrontroller.productShop);

router.get("/cart", productsCrontroller.productCart);

router.get("/detail", productsCrontroller.productDetail);

module.exports = router;
