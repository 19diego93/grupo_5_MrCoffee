//! Extensiones
const { body } = require("express-validator");

const expressions = {
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

//! Validacion
const validacion = [
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
    }
    expressions.password.forEach((element) => {
      console.log(!element.type.test(value));
      if (!element.type.test(value)) {
        throw new Error(element.msg);
      }
    });
    return true;
  }),
];

module.exports = validacion;