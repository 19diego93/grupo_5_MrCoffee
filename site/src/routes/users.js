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
const changePassw = require("./validations/changePassword");

router.get("/login", guestMiddleware, usersController.login);

router.post("/login", login, usersController.loginProcess);

router.get("/register", guestMiddleware, usersController.register);

router.post(
  "/register",
  upload.single("image"),
  register,
  usersController.registerProcess
);

router.get("/profile", authMiddleware, usersController.profile);

router.get("/profile/edit", authMiddleware, usersController.edit);

router.put(
  "/profile/edit",
  upload.single("image"),
  profile,
  usersController.editProfile
);

router.get("/profile/password", authMiddleware, usersController.password);

router.put(
  "/profile/password",
  upload.single("image"),
  changePassw,
  usersController.editPassword
);

router.get("/logout", usersController.logout);

module.exports = router;
