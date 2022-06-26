//! Archivos
const controller = require("../controllers/usersController");
const upload = require("./multer/users");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
router.get("/login", controller.login);

router.get("/register", controller.register);

router.get("/profile", controller.profile);

module.exports = router;
