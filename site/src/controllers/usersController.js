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
            if (req.session.userLogged) {
              res.cookie("category", userLogin.category, {
                maxAge: 1000 * 60 * 1,
              });
            }
            if (req.body.recordame) {
              res.cookie("recordame", req.body.email, {
                maxAge: 1000 * 60 * 2,
              });
            }
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
          if (!req.file) {
            req.body.image = "defaultimg.jpg";
          } else {
            req.body.image = req.file.filename;
          }

          delete req.body.confirmPsw;

          let newUser = {
            id: User.generateId(),
            category: "user",
            fname: req.body.fname,
            lname: req.body.lname,
            image: req.body.image,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
          };

          User.create(newUser);
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
        if (req.file) {
          let filePath = path.resolve(
            __dirname,
            "../../public/img/avatar/" + req.file.filename
          );
          fs.unlinkSync(filePath);
        }
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
  editProfile: (req, res) => {},

  logout: (req, res) => {
    res.clearCookie("recordame");
    res.clearCookie("admin");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = usersController;
