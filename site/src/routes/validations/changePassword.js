const { body } = require("express-validator");

const expressions = [
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
];

const validacion = [
  body("oldPassword").custom((value, { req }) => {
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
    expressions.forEach((element) => {
      if (!element.type.test(value)) {
        throw new Error(element.msg);
      }
    });
    return true;
  }),

  body("newPassword").custom((value, { req }) => {
    let ValidaEspacios = value.indexOf(" ");
    if (value < 1) {
      throw new Error("Introduce tu contraseña.");
    } else if (value.length < 8) {
      throw new Error(`Escribe al menos 8 caracteres.`);
    } else if (value.length > 65) {
      throw new Error("No puedes escribir más de 65 caracteres.");
    } else if (ValidaEspacios !== -1) {
      throw new Error("La contraseña no puede contener espacios en blanco.");
    } else if (value !== req.body.confirmNewPassword) {
      throw new Error("Las contraseñas no coinciden.");
    }
    expressions.forEach((element) => {
      if (!element.type.test(value)) {
        throw new Error(element.msg);
      }
    });
    return true;
  }),
  
  body("confirmNewPassword").custom((value, { req }) => {
    let ValidaEspacios = value.indexOf(" ");
    if (value < 1) {
      throw new Error("Introduce tu contraseña.");
    } else if (value.length < 8) {
      throw new Error(`Escribe al menos 8 caracteres.`);
    } else if (value.length > 65) {
      throw new Error("No puedes escribir más de 65 caracteres.");
    } else if (ValidaEspacios !== -1) {
      throw new Error("La contraseña no puede contener espacios en blanco.");
    } else if (value !== req.body.newPassword) {
      throw new Error("Las contraseñas no coinciden.");
    }
    expressions.forEach((element) => {
      if (!element.type.test(value)) {
        throw new Error(element.msg);
      }
    });
    return true;
  }),
];

module.exports = validacion;
