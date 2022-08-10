//! Archivos
const db = require("../database/models");
const { Op } = require("sequelize");

//!Modelos
const Usuarios = db.Usuario;

function userLoggedMW(req, res, next) {
  res.locals.isLogged = false;
  let emailCookie = req.cookies.recordame;

  Usuarios.findOne({
    where: {
      email: { [Op.like]: `%${emailCookie}%` },
    },
  })
    .then((userFromCookie) => {
      if (userFromCookie) {
        req.session.userLogged = userFromCookie;
      }

      if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
      }

      next();
    })
    .catch((err) => {
      console.log("Erro en userLoggedMW ", err);
    });
}
module.exports = userLoggedMW;
