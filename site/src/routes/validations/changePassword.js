const { body } = require("express-validator");

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
    } else {
      return true;
    }
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
    } else {
      return true;
    }
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
    } else {
      return true;
    }
  }),
];

module.exports = validacion;
