const express = require("express");
const router = express.Router();
const path = require("path")
const mainCrontroller = require(path.join(__dirname,"/../../controllers/mainController"));

router.get("/", mainCrontroller.index);

router.get("/home", mainCrontroller.home);


module.exports = router;
