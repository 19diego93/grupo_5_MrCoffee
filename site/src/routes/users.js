//! Archivos
const upload = require("./multer/users");

//! Extensiones
const express = require("express");
const router = express.Router();

// !Middlewares

const guestMiddleware = require("../middlewares/guestMiddleware")
const validations = require("../middlewares/validationsRegister");
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/login",guestMiddleware, usersController.login);

router.post("/login", usersController.loginProcess);

router.get("/register",guestMiddleware, usersController.register);

router.post("/register", validations, usersController.processRegister);

router.get("/profile",authMiddleware, usersController.profile);

router.get("/logout", usersController.logout);

module.exports= router;