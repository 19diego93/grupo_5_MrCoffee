//! Extensiones
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

//! Archivos
const db = require("../database/models");
const { Op } = require("sequelize");

//!Modelos
const Usuarios = db.Usuario;

//! Archivos
const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const User = require("../modelos/Users");

//! Controlador

const usersController = {
  login: (req, res) => {
    return res.render("users/login");
  },

  // ! proceso de loggeado
  loginProcess: (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        Usuarios.findOne({
          where: {
            email: { [Op.like]: "%" + req.body.email + "%" },
          },
          // include: ["User_category"],
        }).then((user) => {
          if (user) {
            let isOkPassword = bcryptjs.compareSync(
              req.body.password,
              user.password
            );
            if (isOkPassword) {
              console.log(user.id_category_U);
              console.log(user);
              req.session.userLogged = { ...user };

              delete req.session.userLogged.password;

              if (req.session.userLogged) {
                res.cookie("category", user.id_category_U, {
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
              return res.render("users/login", {
                errors: {
                  password: { msg: "La contraseña es incorrecta." },
                },
                oldDate: req.body,
              });
            }
          } else {
            return res.render("users/login", {
              errors: {
                email: { msg: "Esta cuenta no existe." },
              },
              oldDate: req.body,
            });
          }
        });
      } else {
        return res.render("users/login", {
          errors: errors.mapped(),
          oldDate: req.body,
        });
      }
    } catch {
      (e) => {
        console.log("Hubo un error: ", e);
      };
    }
  },

  register: (req, res) => {
    return res.render("users/register");
  },

  //! proceso de registración
  processRegister: async (req, res) => {
    let errors = validationResult(req);

    try {
      if (errors.isEmpty()) {
        let emailDb = await Usuarios.findAll({
          where: {
            email: { [Op.like]: "%" + req.body.email + "%" },
          },
        });

        if (!emailDb.length > 0) {
          if (!req.file) {
            req.body.image = "defaultimg.jpg";
          } else {
            req.body.image = req.file.filename;
          }

          let newUser = {
            first_name: req.body.fname,
            last_name: req.body.lname,
            image: req.body.image,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            id_category_U: 2,
          };

          await Usuarios.create(newUser);

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
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },

  profile: (req, res) => {
    return res.render("users/profile", {
      user: req.session.userLogged,
    });
  },

  editProfile: async (req, res) => {
    try {
      let errors = validationResult(req);
    } catch (e) {
      console.log("Hubo un error: ", e);
    }

    if (errors.isEmpty()) {
      // Todos los usuarios
      let allUsers = users;

      let userFound = allUsers.find((user) => {
        if (user.id == req.session.userLogged.id) {
          return user;
        }
      });

      // Consulto si el Email existe en la base de datos
      // Utilizo toUpperCase para hacer los Email mayusculas y comprobar.
      let email = req.body.email.toUpperCase();
      let oldEmail = userFound.email.toUpperCase();
      let userInDb;
      if (oldEmail == email) {
        userInDb = false;
      } else {
        allUsers.find((oneUser) => {
          let userDbEmail = oneUser.email.toUpperCase();

          if (userDbEmail == email) {
            userInDb = true;
          }
        });
      }

      // Consulto si la variable NO me dio TRUE.
      if (!userInDb) {
        // Configuracion del guardado de IMG
        let image;
        if (req.file) {
          image = req.file.filename;
          // let filePath = path.resolve(
          //   __dirname,
          //   "../../public/img/avatar/" + req.body.oldImage
          // );
          // fs.unlinkSync(filePath);
        } else {
          image = userFound.image;
        }

        // let password;
        // if (!req.body.password === userFound.password) {
        //   password = req.body.password;
        // } else {
        //   userFound.password;
        // }

        let userEdit = {
          id: parseInt(userFound.id),
          category: userFound.category,
          image: image,
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: userFound.password,
        };

        let edited = allUsers.map((user) => {
          if (user.id == userEdit.id) {
            return (user = userEdit);
          }
          return user;
        });

        console.log(edited);
        let update = JSON.stringify(edited, null, " ");
        fs.writeFileSync(usersFilePath, update, "utf-8");
        res.redirect("/");
      } else {
        if (req.file) {
          let filePath = path.resolve(
            __dirname,
            "../../public/img/avatar/" + req.file.filename
          );
          fs.unlinkSync(filePath);
        }

        return res.render("users/profile", {
          errors: {
            email: {
              msg: "Este email ya está registrado.",
            },
          },
          user: req.session.userLogged,
          oldDate: req.body,
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

      return res.render("users/profile", {
        errors: errors.mapped(),
        user: req.session.userLogged,
        oldDate: req.body,
      });
    }
  },

  logout: (req, res) => {
    res.clearCookie("recordame");
    res.clearCookie("admin");
    res.clearCookie("category");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = usersController;
