//! Extensiones
const { body } = require("express-validator");

//! Validacion
module.exports = [
  body("email")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isEmail()
    .withMessage("El correo no es válido.")
    .bail()
    .isLength({ max: 100 })
    .withMessage("No puede escribir más de 100 caracteres."),

  body("password")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Escribe al menos 8 caracteres.")
    .bail()
    .isLength({ max: 65 })
    .withMessage("No puede escribir más de 65 caracteres."),
];
