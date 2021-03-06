const { body } = require("express-validator");
const path = require("path");
const fs = require("fs");

const validacion = [
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".png", ".jpg", ".jpeg"];
    if (file) {
      let fileExtension = path.extname(file.originalname);
      let fileSize = file.size;
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Solo se permiten extensiones ${acceptedExtensions.join(" ")}`
        );
      }
      if (fileSize > 1200000) {
        throw new Error("El tamaño debe ser menor a 1MB.");
      }
    }
    return true;
  }),

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
];

module.exports = validacion;
