//! Archivos
const db = require("../../database/models");
const { Op } = require("sequelize");

//!Modelos
const Products = db.Product;
const Usuarios = db.Usuario;
const Ventas = db.Venta;

//!Controlador
const controller = {
  product: async (req, res) => {
    let product = await Products.findByPk(req.params.id);
    return res.json(product);
  },

  checkout: async (req, res) => {
    // const date = (Date.now() * new Date().getMilliseconds())

    await Ventas.create({ ...req.body, user_id: req.session.userLogged.id },{
      include: [
        {association: "Product"}
      ],
    })

    res.json({ ok: true, status: 200 });
  },

  Ventas: async (req, res) => {
    let ventas = await Ventas.findAll({
      include: [
        {association: "Usuario"}
      ],
    })
    console.log("--------------");
    // ventas.forEach(element => {
    //   console.log(element.dataValues); 
    // });
    console.log("--------------");

    let usuarios = await Usuarios.findAll({
      include: [
        {association: "Venta"}
      ],
    })
    console.log("--------------");
    // usuarios.forEach(element => {
    //   console.log(element.dataValues); 
    // });
    console.log("--------------");

    return res.render("api/pruebas", { ventas, usuarios });
  }
};

module.exports = controller;
