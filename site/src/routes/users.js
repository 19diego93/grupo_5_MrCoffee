//! Archivos
const upload = require("./multer/users");
const usersController = require("../controllers/usersController");

//! Extensiones
const express = require("express");
const router = express.Router();

// !Middlewares
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const login = require("./validations/validationsLogin");
const register = require("./validations/validationsRegister");
const profile = require("./validations/validationsProfile");

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

router.put(
  "/user/profile",
  authMiddleware,
  upload.single("image"),
  profile,
  usersController.editProfile
);

router.get("/user/logout", usersController.logout);

module.exports = router;
