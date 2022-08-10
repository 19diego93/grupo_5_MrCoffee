//! Archivos
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//!Modelos
const Products = db.Product;

//!Controlador
const productsController = {
  list: async (req, res) => {
    try {
      let products = await Products.findAll({
        where: {
          stock: { [Op.gt]: 0 },
        },
      });
      return res.render("products/productShop", { products });
    } catch (err) {
      console.log(err);
    }
  },

  detail: async (req, res) => {
    try {
      let product = await Products.findByPk(req.params.id);

      return res.render("products/productDetail", { product });
    } catch (err) {
      console.log(err);
    }
  },

  // ESTO ES SOLO VISUAL
  cart: (req, res) => {
    return res.render("products/productCart");
  },
};

module.exports = productsController;
