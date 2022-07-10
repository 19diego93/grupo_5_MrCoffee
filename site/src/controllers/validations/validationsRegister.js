const { body } = require("express-validator");

module.exports = [
  body("fname")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Escribe al menos 3 caracteres.")
    .bail()
    .isLength({ max: 40 })
    .withMessage("No puede escribir más de 40 caracteres."),

  body("lname")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Escribe al menos 3 caracteres.")
    .bail()
    .isLength({ max: 40 })
    .withMessage("No puede escribir más de 40 caracteres."),

  body("email")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isEmail()
    .withMessage("El correo no es válido.")
    .bail()
    .isLength({ max: 320 })
    .withMessage("No puede escribir más de 320 caracteres."),

  body("password")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Escribe al menos 8 caracteres.")
    .bail()
    .isLength({ max: 120 })
    .withMessage("No puede escribir más de 120 caracteres."),

  body("confirmPsw")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      return false;
    })
    .withMessage("Las contraseñas no coinciden.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Escribe al menos 8 caracteres.")
    .bail()
    .isLength({ max: 120 })
    .withMessage("No puede escribir más de 120 caracteres."),
];
