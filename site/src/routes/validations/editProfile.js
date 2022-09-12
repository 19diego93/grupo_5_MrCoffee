const { body } = require("express-validator");
const path = require("path");

const validacion = [
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

  body("image").custom((value, { req }) => {
    let file = req.file;

    if (file) {
      let acceptedExtensions = [".png", ".jpg", ".jpeg", ".gif"];
      let fileExtension = path.extname(file.originalname);
      if (acceptedExtensions.includes(fileExtension)) {
        let fileSize = file.size;
        if (fileSize <= 1200000) {
          return true;
        } else {
          throw new Error("El tamaño debe ser menor a 1MB.");
        }
      } else {
        throw new Error(
          `Solo se permiten extensiones ${acceptedExtensions.join(" ")}`
        );
      }
    } else {
      return true;
    }
  }),

  body("email")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isEmail()
    .withMessage("El correo no es válido.")
    .bail()
    .isLength({ max: 100 })
    .withMessage("No puede escribir más de 100 caracteres."),
];

module.exports = validacion;
