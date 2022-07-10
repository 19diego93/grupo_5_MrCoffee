//! Extensiones
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

//! Archivos
const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const User = require("../models/Users");

//! Controlador

const usersController = {
  login: (req, res) => {
    return res.render("users/login");
  },

  // ! proceso de loggeado
  loginProcess: async (req, res) => {
    let userLogin = await User.findByField("email", req.body.email);

    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        if (userLogin) {
          let isOkPassword = bcryptjs.compareSync(
            req.body.password,
            userLogin.password
          );
          if (isOkPassword) {
            delete userLogin.password;
            req.session.userLogged = userLogin;
            return res.redirect("/");
          } else {
            return res.render("../views/users/login", {
              errors: {
                password: { msg: "La contraseña es incorrecta." },
              },
              oldDate: req.body,
            });
          }
        } else {
          return res.render("../views/users/login", {
            errors: {
              email: { msg: "Esta cuenta no existe." },
            },
            oldDate: req.body,
          });
        }
      } else {
        return res.render("../views/users/login", {
          errors: errors.mapped(),
          oldDate: req.body,
        });
      }
    } catch {
      (err) => {
        console.log("Hubo un error: ", err);
      };
    }
  },

  register: (req, res) => {
    return res.render("users/register");
  },

  //! proceso de registración
  processRegister: (req, res) => {
    let errors = validationResult(req);
    try {
      if (errors.isEmpty()) {
        let userInDb = User.findByField("email", req.body.email);
        if (!userInDb) {
          delete req.body.confirmPsw;
          let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
          };
          User.create(userToCreate);
          return res.redirect("login");
        } else {
          return res.render("users/register", {
            errors: {
              email: {
                msg: "Este email ya está registrado.",
              },
            },
            oldData: req.body,
          });
        }
      } else {
        return res.render("users/register", {
          errors: errors.mapped(),
          oldData: req.body,
        });
      }
    } catch {
      (err) => {
        console.log("Hubo un error: ", err);
      };
    }

    // return res.redirect("login");
  },

  profile: (req, res) => {
    return res.render("users/profile", {
      user: req.session.userLogged,
    });
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = usersController;
