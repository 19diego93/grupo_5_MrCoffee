const { body } = require("express-validator");

const validations = [
    body("fname").notEmpty().withMessage("Tienes que escribir un nombre"),
    body("lname").notEmpty().withMessage("Tienes que escribir un apellido"),
    body("mail").notEmpty().withMessage("Tienes que escribir un email").bail()
    .isEmail().withMessage("Formato de correo incorrecto "),
    body("psw").notEmpty().withMessage("Tienes que escribir una contraseña"),
];

module.exports = validations;