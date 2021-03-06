//! Extensiones
const { body } = require("express-validator");
const path = require("path");

//! Validacion
module.exports = [
  body("name")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isLength({ max: 40 })
    .withMessage("Máximo de 40 caracteres."),
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".png", ".jpg", ".jpeg"];
    if (!file) {
      throw new Error("Tienes que subir una imagen.");
    } else {
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
  body("description")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío."),
  body("category").notEmpty().withMessage("Debes seleccionar una opcion."),
  body("stock")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isInt()
    .withMessage("Este campo debe contener numeros.")
    .bail()
    .isFloat({ min: 1 })
    .withMessage("El numero debe ser mayor a 0."),
  body("price")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isInt()
    .withMessage("Este campo debe contener numeros."),
  body("offer")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isInt()
    .withMessage("Este campo debe contener numeros.")
    .isLength({ max: 2 })
    .withMessage("Máximo de 2 números."),
];
