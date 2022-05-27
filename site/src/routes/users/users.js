const express = require("express");
const router = express.Router();
const path = require("path")
const usersController = require(path.join(__dirname,"/../../controllers/usersController"));

router.get("/login", usersController.login);

router.get("/register", usersController.register);

router.get("/profile", usersController.profile);

module.exports= router;