//! Archivos
const upload = require("./multer/users");

//! Extensiones
const express = require("express");
const router = express.Router();

// !Middlewares
const guestMiddleware = require("../middlewares/guestMiddleware")
const validationsRegister = require("../controllers/validations/validationsRegister");
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");
const validationsLogin = require("../controllers/validations/validationsLogin");

router.get("/login",guestMiddleware, usersController.login);

router.post("/login",validationsLogin, usersController.loginProcess);

router.get("/register",guestMiddleware, usersController.register);

router.post("/register", validationsRegister, usersController.processRegister);

router.get("/profile",authMiddleware, usersController.profile);

router.get("/logout", usersController.logout);

module.exports= router;