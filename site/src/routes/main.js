const express = require("express");
const path = require("path");
const router = express.Router();
const mainCrontroller = require("../controllers/mainController");

router.get("/", mainCrontroller.index);

router.get("/home", mainCrontroller.home);

module.exports = router;
