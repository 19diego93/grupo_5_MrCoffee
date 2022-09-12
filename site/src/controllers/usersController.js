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
const Ventas = db.Venta;

//! Controlador
const usersController = {
  /* Esta es una función que representa la página de inicio de sesión. */
  login: (req, res) => {
    return res.render("users/login", { title: "│ Inicia sesion" });
  },

  /* Este es el proceso de inicio de sesión. */
  loginProcess: async (req, res) => {
    /* Validando el formulario. */
    let errors = validationResult(req);

    /* Esta es una validación del formulario. */
    if (!errors.isEmpty()) {
      /* Devolviendo la página de inicio de sesión con los errores. */
      return res.render("users/login", {
        errors: errors.mapped(),
        oldData: req.body,
        title: "│ Inicia sesion",
      });
    }

    /* Buscando un usuario con el correo electrónico que el usuario ingresó en el formulario de inicio de sesión. */
    let CheckingUser = await Usuarios.findOne({
      where: {
        email: { [Op.like]: `%${req.body.email}%` },
      },
      include: [{ association: "User_category" }],
    });

    /* Comprobando si el usuario no está en la base de datos. */
    if (!CheckingUser) {
      /* Devolviendo la página de inicio de sesión con el mensaje de error. */
      return res.render("users/login", {
        errors: {
          email: { msg: "Esta cuenta no existe." },
        },
        oldData: req.body,
        title: "│ Inicia sesion",
      });
    }

    /* Copiar los datos del objeto de usuario a un nuevo objeto. */
    let userData = { ...CheckingUser.dataValues };

    /* Comparar la contraseña que el usuario ingresó en el formulario de inicio de sesión con la contraseña que está almacenada en la base de datos. */
    let isOkPassword = bcryptjs.compareSync(
      req.body.password,
      userData.password
    );

    /* Comprobando si la contraseña es incorrecta. */
    if (!isOkPassword) {
      /* Devolviendo la página de inicio de sesión con el mensaje de error. */
      return res.render("users/login", {
        errors: {
          password: { msg: "La contraseña es incorrecta." },
        },
        oldData: req.body,
        title: "│ Inicia sesion",
      });
    }

    /* Copiar los datos del objeto de usuario y crea una sesión. (express-session) */
    req.session.userLogged = { ...userData };

    /* Eliminación de la contraseña de la sesión. */
    delete req.session.userLogged.password;

    /* Configuración del tiempo de caducidad de la sesión. (express-session) */
    req.session.cookie.expires = new Date(Date.now() + 3600000);
    req.session.cookie.maxAge = 3600000;

    /* Esta es una función que crea una cookie con el correo electrónico del usuario. (cookie-parser) */
    if (req.body.recordame) {
      res.cookie("recordame", req.body.email, {
        maxAge: 1000 * 60 * 60 * 24,
      });
    }

    /* Redirigir al usuario a la página de inicio. */
    return res.redirect("/");
  },

  /* Esta es una función que representa la página de registro. */
  register: (req, res) => {
    return res.render("users/register", { title: "│ Crea una cuenta" });
  },

  /* Este es el proceso de creación un nuevo usuario en la base de datos. */
  registerProcess: async (req, res) => {
    /* Validando el formulario. */
    let errors = validationResult(req);

    /* Comprobando si hay algún error en el formulario. */
    if (!errors.isEmpty()) {
      /* Borrando el archivo que fue subido. */
      if (req.file) {
        let filePath = path.resolve(
          __dirname,
          "../../public/img/avatar/" + req.file.filename
        );
        fs.unlinkSync(filePath);
      }

      /* Devolviendo la página con los errores. */
      return res.render("users/register", {
        errors: errors.mapped(),
        oldData: req.body,
        title: "│ Crea una cuenta",
      });
    }

    /* Comprobando si el correo electrónico ya está en la base de datos. */
    let CheckingEmail = await Usuarios.findOne({
      where: {
        email: { [Op.like]: `%${req.body.email}%` },
      },
      include: [{ association: "User_category" }],
    });

    /* Comprobando si el correo electrónico ya está en la base de datos. */
    if (CheckingEmail) {
      /* Devolviendo la página con el mensaje de error. */
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

    /* Este es un condicional que comprueba si el usuario ha subido una imagen o no. Si el usuario no
    ha subido una imagen, se utilizará la imagen predeterminada. Si el usuario ha subido una imagen,
    se utilizará la imagen que haya subido. */
    if (!req.file) {
      req.body.image = "defaultimg.gif";
    } else {
      req.body.image = req.file.filename;
    }

    /* Crear un nuevo objeto de usuario con los datos que el usuario ha introducido en el formulario. */
    let newUser = {
      first_name: req.body.fname,
      last_name: req.body.lname,
      image: req.body.image,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      id_category_U: 2,
    };

    /* Creación de un nuevo usuario en la base de datos. */
    await Usuarios.create(newUser);

    /* Redirigir al usuario a la página de inicio de sesión. */
    return res.redirect("login");
  },

  /* Representación de la página de perfil. */
  profile: async (req, res) => {
    let acquiring = await Ventas.findAll({
      where: {
        user_id: { [Op.eq]: req.session.userLogged.id },
      },
    });

    return res.render("users/profile", {
      user: req.session.userLogged,
      acquiring: acquiring,
      title: "│ Perfil",
    });
  },

  edit: (req, res) => {
    return res.render("users/edit", {
      user: req.session.userLogged,
      title: "│ Perfil",
    });
  },

  editProfile: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let User = await Usuarios.findOne({
          where: {
            id: { [Op.eq]: req.session.userLogged.id },
          },
          include: [{ association: "User_category" }],
        });

        let newEmail = req.body.email;
        let oldEmail = User.email;

        let userInDb;
        if (oldEmail == newEmail) {
          userInDb = false;
        } else {
          let checkEmail = await Usuarios.findOne({
            where: {
              email: { [Op.eq]: newEmail },
            },
            include: [{ association: "User_category" }],
          });
          if (checkEmail) {
            userInDb = true;
          } else {
            userInDb = false;
          }
        }

        if (userInDb != true) {
          let isOkPassword = bcryptjs.compareSync(
            req.body.oldPassword,
            User.password
          );

          if (isOkPassword) {
            let image;
            if (req.file) {
              image = req.file.filename;

              if (User.image != "defaultimg.jpg") {
                try {
                  let filePath = path.resolve(
                    __dirname,
                    "../../public/img/avatar/" + User.dataValues.image
                  );
                  fs.unlinkSync(filePath);
                } catch (e) {
                  console.log(e);
                }
              }
            } else {
              image = User.image;
            }

            let newPassword;

            if (req.body.newPassword.length > 0) {
              newPassword = bcryptjs.hashSync(req.body.newPassword, 10);
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

            req.session.userLogged = { ...userEdit };

            delete req.session.userLogged.password;

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
                oldPassword: {
                  msg: "La contraseña es incorrecta.",
                },
              },
              user: req.session.userLogged,
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
            errors: {
              email: {
                msg: "Este email ya está registrado.",
              },
            },
            user: req.session.userLogged,
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
          user: req.session.userLogged,
          oldData: req.body,
          title: "│ Perfil",
        });
      }
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },

  password: (req, res) => {
    return res.render("users/editPassword", {
      user: req.session.userLogged,
      title: "│ Perfil",
    });
  },

  editPassword: async (req, res) => {
    let errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.render("users/editPassword", {
        errors: errors.mapped(),
        title: "│ Perfil",
      });
    }

    let userInDb = await Usuarios.findOne({
      where: {
        id: { [Op.eq]: req.session.userLogged.id },
      },
      include: [{ association: "User_category" }],
    });
    let User = userInDb.dataValues;
    let oldPassword = req.body.oldPassword;
    let passwDb = User.password;

    let isOkPassword = bcryptjs.compareSync(oldPassword, passwDb);
    if (!isOkPassword) {
      return res.render("users/editPassword", {
        errors: {
          oldPassword: {
            msg: "La contraseña es incorrecta.",
          },
        },
        title: "│ Perfil",
      });
    }
    let newPassw = req.body.newPassword;
    newPassw = bcryptjs.hashSync(req.body.newPassword, 10);

    await Usuarios.update(
      { ...User, password: newPassw },
      {
        where: { id: User.id },
      }
    );

    req.session.userLogged = { ...User };

    delete req.session.userLogged.password;
    console.log(req.session.userLogged);
    return res.redirect("/user/profile");
  },

  logout: async (req, res) => {
    /* Limpiando la cookie y destruyendo la sesión. */
    await res.clearCookie("recordame");
    await req.session.destroy();

    /* Redirigir al usuario a la página de inicio de sesión. */
    return res.redirect("/user/login");
  },
};

module.exports = usersController;
