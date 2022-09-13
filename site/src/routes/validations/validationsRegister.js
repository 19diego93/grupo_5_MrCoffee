const { body } = require("express-validator");
const path = require("path");

const expressions = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
  correo:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: [
    {
      type: new RegExp("(?=.*[a-z])"),
      msg: "Debe tener mínimo una Minúscula. [a-z]",
    },
    {
      type: new RegExp("(?=.*[A-Z])"),
      msg: "Debe tener mínimo una Mayúscula. [A-Z]",
    },
    {
      type: new RegExp("(?=.*[0-9])"),
      msg: "Debe tener mínimo un Número. [0-9]",
    },
    {
      type: new RegExp("(?=.*[!@#$%^&*])"),
      msg: "Debe tener mínimo un Carácter especial. [!@#$%^&*]",
    },
  ],
};

const validacion = [
  body("fname")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Escribe al menos 3 caracteres.")
    .bail()
    .isLength({ max: 40 })
    .withMessage("No puede escribir más de 40 caracteres.")
    .bail()
    .custom((value, { req }) => {
      if (!expressions.nombre.test(value)) {
        throw new Error("Los caracteres ingresados no son válidos.");
      }
      return true;
    }),

  body("lname")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío.")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Escribe al menos 3 caracteres.")
    .bail()
    .isLength({ max: 40 })
    .withMessage("No puede escribir más de 40 caracteres.")
    .bail()
    .custom((value, { req }) => {
      if (!expressions.nombre.test(value)) {
        throw new Error("Los caracteres ingresados no son válidos.");
      }
      return true;
    }),

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
    .withMessage("No puede escribir más de 100 caracteres.")
    .bail()
    .custom((value, { req }) => {
      if (!expressions.correo.test(value)) {
        throw new Error("Los caracteres ingresados no son válidos.");
      }
      return true;
    }),

  body("password").custom((value, { req }) => {
    let ValidaEspacios = value.indexOf(" ");
    if (value < 1) {
      throw new Error("Introduce tu contraseña.");
    } else if (value.length < 8) {
      throw new Error(`Escribe al menos 8 caracteres.`);
    } else if (value.length > 65) {
      throw new Error("No puedes escribir más de 65 caracteres.");
    } else if (ValidaEspacios !== -1) {
      throw new Error("La contraseña no puede contener espacios en blanco.");
    } else if (value !== req.body.confirmPsw) {
      throw new Error("Las contraseñas no coinciden.");
    }
    expressions.password.forEach((element) => {
      if (!element.type.test(value)) {
        throw new Error(element.msg);
      }
    });
    return true;
  }),

  body("confirmPsw").custom((value, { req }) => {
    let ValidaEspacios = value.indexOf(" ");
    if (value < 1) {
      throw new Error("Introduce tu contraseña.");
    } else if (value.length < 8) {
      throw new Error(`Escribe al menos 8 caracteres.`);
    } else if (value.length > 65) {
      throw new Error("No puedes escribir más de 65 caracteres.");
    } else if (ValidaEspacios !== -1) {
      throw new Error("La contraseña no puede contener espacios en blanco.");
    } else if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden.");
    }
    expressions.password.forEach((element) => {
      if (!element.type.test(value)) {
        throw new Error(element.msg);
      }
    });
    return true;
  }),
];

module.exports = validacion;
