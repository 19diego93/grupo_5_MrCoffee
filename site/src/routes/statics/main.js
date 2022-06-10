const express = require("express");
const router = express.Router();
const path = require("path");
const mainController = require(path.join(
  __dirname,
  "/../../controllers/mainController"
));

router.get("/", mainController.index);

router.get("/search", mainController.search);

module.exports = router;
