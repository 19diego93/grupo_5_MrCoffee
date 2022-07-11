//! Archivos
const upload = require("./multer/users");

//! Extensiones
const express = require("express");
const router = express.Router();

// !Middlewares
const guestMiddleware = require("../middlewares/guestMiddleware");
const register = require("../controllers/validations/validationsRegister");
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");
const login = require("../controllers/validations/validationsLogin");

router.get("/user/login", guestMiddleware, usersController.login);

router.post("/user/login", login, usersController.loginProcess);

router.get("/user/register", guestMiddleware, usersController.register);

router.post(
  "/user/register",
  upload.single("image"),
  register,
  usersController.processRegister
);

router.get("/user/profile", authMiddleware, usersController.profile);

router.put("/user/profile/:id",authMiddleware, usersController.editProfile);

router.get("/user/logout", usersController.logout);

module.exports = router;
