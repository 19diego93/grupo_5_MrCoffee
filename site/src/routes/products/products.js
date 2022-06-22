const express = require("express");
const router = express.Router();
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, `../../../public/img`));
  },
  filename: (req, file, cb) => {
    const newFileName = "cafe" + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});
const upload = multer({ storage: storage });

const productsCrontroller = require(path.join(
  __dirname,
  "/../../controllers/productsController"
));

router.get("/", productsCrontroller.productShop);

router.get("/cart/:id?", productsCrontroller.productCart);

router.get("/detail/:id", productsCrontroller.productDetail);

module.exports = router;
