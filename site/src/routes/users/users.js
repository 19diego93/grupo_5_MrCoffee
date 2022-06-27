const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer")
const validations = require("../../middlewares/validationsRegister");
const usersController = require("../../controllers/usersController");

router.get("/login", usersController.login);

router.post("/login", usersController.loginProcess);

router.get("/register", usersController.register);

router.post("/register",validations , usersController.processRegister);

router.get("/profile", usersController.profile);

module.exports= router;