const { body } = require("express-validator");

const validations = [
body("fname")
    .notEmpty()
    .withMessage("Tienes que escribir un nombre")
    .isLength({ max: 40 },{min:3}),
body("lname")
    .notEmpty()
    .withMessage("Tienes que escribir un apellido")
    .isLength({ max: 40 },{min:3}),
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