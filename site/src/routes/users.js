//! Archivos
const upload = require("./multer/users");
const usersController = require("../controllers/usersController");

//! Extensiones
const express = require("express");
const router = express.Router();

// !Middlewares
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const login = require("./validations/login");
const register = require("./validations/register");
const profile = require("./validations/editProfile");
const changePassw = require("./validations/changePassword");

/* Una ruta que va a la página de inicio de sesión. */
router.get("/login", guestMiddleware, usersController.login);
/* Una ruta que crea un inicio de sesión. */
router.post("/login",guestMiddleware, login, usersController.loginProcess);
/* Una ruta que va a la página de registro. */
router.get("/register", guestMiddleware, usersController.register);
/* Una ruta que crea un registro. */
router.post(
  "/create",
  upload.single("image"),
  register,
  usersController.registerProcess
);
/* Una ruta que va a la página de perfil. */
router.get("/profile", authMiddleware, usersController.profile);
/* Una ruta que va a la página de edición de perfil. */
router.get("/profile/edit", authMiddleware, usersController.edit);
/* Una ruta que se utiliza para editar un perfil. */
router.put(
  "/update/profile",
  upload.single("image"),
  profile,
  usersController.editProfile
);
/* Una ruta que va a la página de la contraseña. */
router.get("/profile/password", authMiddleware, usersController.password);
/* Una ruta que se utiliza para editar una contraseña. */
router.put(
  "/update/password",
  upload.single("image"),
  changePassw,
  usersController.editPassword
);
/* Una ruta que va a la página de pedidos. */
router.get("/profile/orders", authMiddleware, usersController.orders)
/* Una ruta que va a la página del detalle de los pedidos. */
router.get("/profile/orders/:id", authMiddleware, usersController.ordersDetail)
/* Una ruta que se utiliza para cerrar la sesión. */
router.get("/logout", usersController.logout);

module.exports = router;