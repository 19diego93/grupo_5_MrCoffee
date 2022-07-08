const { body } = require("express-validator");

const validations = [
body("mail")
    .notEmpty()
    .withMessage("Tienes que escribir un email")
    .bail()
    .isEmail()
    .withMessage("Formato de correo incorrecto "),
body("psw")
    .notEmpty()
    .withMessage("Tienes que escribir una contraseña"),
];

module.exports = validations;