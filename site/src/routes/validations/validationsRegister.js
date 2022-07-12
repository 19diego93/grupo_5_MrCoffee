const { body } = require("express-validator");
const path = require("path");
const fs = require("fs");

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

  body("image").custom((value, { req }) => {
    let file = req.file;

    if (file) {
      let acceptedExtensions = [".png", ".jpg", ".jpeg"];
      let fileExtension = path.extname(file.originalname);
      if (acceptedExtensions.includes(fileExtension)) {
        let fileSize = file.size;
        if (fileSize <= 1200000) {
          return true;
        } else {
          let filePath = path.resolve(
            __dirname,
            "../../../public/img/avatar/" + req.file.filename
          );
          fs.unlinkSync(filePath);
          throw new Error("El tamaño debe ser menor a 1MB.");
        }
      } else {
        let filePath = path.resolve(
          __dirname,
          "../../../public/img/avatar/" + req.file.filename
        );
        fs.unlinkSync(filePath);
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
