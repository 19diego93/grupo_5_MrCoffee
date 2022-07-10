//! Extensiones
const fs = require("fs");
const path = require("path");
const bcryptjs = require('bcryptjs');
const  { validationResult } = require("express-validator");

//! Archivos
const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const User = require("../models/Users")

//! Controlador

const usersController = {
  

  register: (req, res) => {
    res.render("users/register");
  },

  //! proceso de registración
  processRegister: (req,res)=>{
  const resultValidation = validationResult(req);
  
  if (resultValidation.errors.length > 0){
    return res.render("users/register", {
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }
    let userInDb = User.findByField('mail', req.body.mail);
    if (userInDb){
      return res.render("users/register", {
        errors:{
          mail:{
            msg:"Este email ya está registrado"
          }
        },
        oldData: req.body,
      })
    }
    let userToCreate = {
      ...req.body,
      psw: bcryptjs.hashSync(req.body.psw, 10)
    }
    let userCreated = User.create(userToCreate);
    return res.redirect("login")

  },

  login: (req, res) => {
    res.render("users/login");
  },

  // ! proceso de loggeado
  loginProcess: (req,res) => {
    let userToLogin = User.findByField("mail", req.body.mail);
    if (userToLogin) {
      let isOkPassword = bcryptjs.compareSync(req.body.psw, userToLogin.psw);

      if (isOkPassword) {
        delete userToLogin.psw
        req.session.userLogged = userToLogin
        return res.redirect("/")
      }
    
    return res.render("../views/users/login.ejs", {
      errors: {
        mail: {
          msg: "Credenciales inválidas"
        }
      }
    });
    }
    return res.render("../views/users/login.ejs", {
      errors: {
        mail: {
          msg: "No se encuentra este email en la base de datos "
        }
      }
    });
  },

  profile: (req, res) => {
    return res.render("users/profile", {
    user: req.session.userLogged 
   });   
  },
  editProfile: (req, res) => {
    return res.send("funciona")
   },

  logout: (req,res) => {
    req.session.destroy();
    return res.redirect("/")
  },
   
};

module.exports = usersController;
