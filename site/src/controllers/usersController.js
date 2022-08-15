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

//! Controlador
const usersController = {
  login: (req, res) => {
    return res.render("users/login", { title: "│ Inicia sesion" });
  },

  // ! proceso de loggeado
  loginProcess: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let user = await Usuarios.findOne({
          where: {
            email: { [Op.like]: `%${req.body.email}%` },
          },
          // include: ["User_category"],
        });

        if (user) {
          let isOkPassword = bcryptjs.compareSync(
            req.body.password,
            user.password
          );

          if (isOkPassword) {
            req.session.userLogged = { ...user };

            delete req.session.userLogged.dataValues.password;

            if (req.body.recordame) {
              res.cookie("recordame", req.body.email, {
                maxAge: 1000 * 60 * 60 * 24,
              });
            }

            return res.redirect("/");
          } else {
            return res.render("users/login", {
              errors: {
                password: { msg: "La contraseña es incorrecta." },
              },
              oldData: req.body,
              title: "│ Inicia sesion",
            });
          }
        } else {
          return res.render("users/login", {
            errors: {
              email: { msg: "Esta cuenta no existe." },
            },
            oldData: req.body,
            title: "│ Inicia sesion",
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

        return res.render("users/login", {
          errors: errors.mapped(),
          oldData: req.body,
          title: "│ Inicia sesion",
        });
      }
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },

  register: (req, res) => {
    return res.render("users/register", { title: "│ Crea una cuenta" });
  },

  //! proceso de registración
  processRegister: async (req, res) => {
    let errors = validationResult(req);

    try {
      if (errors.isEmpty()) {
        let emailDb = await Usuarios.findOne({
          where: {
            email: { [Op.like]: `%${req.body.email}%` },
          },
        });

        if (!emailDb) {
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
            title: "│ Crea una cuenta",
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
          title: "│ Crea una cuenta",
        });
      }
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },

  profile: (req, res) => {
    return res.render("users/profile", {
      user: req.session.userLogged.dataValues,
      title: "│ Perfil",
    });
  },

  editProfile: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let User = await Usuarios.findOne({
          where: {
            id: { [Op.eq]: req.session.userLogged.dataValues.id },
          },
        });

        let newEmail = req.body.email;
        let oldEmail = User.email;

        let userInDb;
        if (oldEmail == newEmail) {
          userInDb = false;
        } else {
          let User = await Usuarios.findOne({
            where: {
              email: { [Op.eq]: newEmail },
            },
          });
          if (User) {
            userInDb = true;
          } else {
            userInDb = false;
          }
        }

        if (userInDb != true) {
          let image;
          if (req.file) {
            image = req.file.filename;

            if (User.image != "defaultimg.jpg") {
              let filePath = path.resolve(
                __dirname,
                "../../public/img/avatar/" + User.image
              );
              fs.unlinkSync(filePath);
            }
          } else {
            image = User.image;
          }

          let newPassword;

          if (req.body.oldPassword != "") {
            let isOkPassword = bcryptjs.compareSync(
              req.body.oldPassword,
              User.password
            );
            if (isOkPassword) {
              // if()
              newPassword = bcryptjs.hashSync(req.body.newPassword, 10);
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
                  oldPassword: {
                    msg: "La contraseña es incorrecta.",
                  },
                },
                user: req.session.userLogged.dataValues,
                oldData: req.body,
                title: "│ Perfil",
              });
            }
          } else {
            newPassword = User.password;
          }

          let userEdit = {
            id: User.id,
            first_name: req.body.fname,
            last_name: req.body.lname,
            image: image,
            email: req.body.email,
            password: newPassword,
            id_category_U: User.id_category_U,
          };

          await Usuarios.update(userEdit, {
            where: { id: User.id },
          });

          req.session.userLogged.dataValues = { ...userEdit };

          delete req.session.userLogged.dataValues.password;

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
            user: req.session.userLogged.dataValues,
            oldData: req.body,
            title: "│ Perfil",
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
          user: req.session.userLogged.dataValues,
          oldData: req.body,
          title: "│ Perfil",
        });
      }
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },

  logout: (req, res) => {
    res.clearCookie("recordame");
    req.session.destroy();

    return res.redirect("/");
  },
};

module.exports = usersController;
