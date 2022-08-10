//! Archivos
const db = require("../database/models");
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
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },

  detail: async (req, res) => {
    try {
      let product = await Products.findByPk(req.params.id);

      return res.render("products/productDetail", { product });
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },

  // ESTO ES SOLO VISUAL
  cart: (req, res) => {
    return res.render("products/productCart");
  },
};

module.exports = productsController;
