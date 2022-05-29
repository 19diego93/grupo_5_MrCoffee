const express = require("express");
const router = express.Router();
const path = require("path");
const adminController = require(path.join(
  __dirname,
  "/../../controllers/adminController"
));

router.get("/create", adminController.createProducts);

router.get("/edit", adminController.editProducts);

module.exports = router;
