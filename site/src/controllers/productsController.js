//! Archivos
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//!Modelos
const Products = db.Product;

//!Controlador
const productsController = {
  list: (req, res) => {
    Products.findAll({
      where: {
        stock: { [Op.gt]: 0 },
      },
    }).then((products) => {
      return res.render("products/productShop", { productos: products });
    });
  },

  detail: (req, res) => {
    Products.findByPk(req.params.id).then((product) => {
      return res.render("products/productDetail", { product });
    });
  },

  // ESTO ES SOLO VISUAL
  // NO Funciona por el motivo de que no hicimos el carrito.
  cart: (req, res) => {
    return res.render("products/productCart");
  },
};

module.exports = productsController;
