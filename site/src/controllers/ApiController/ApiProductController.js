//! Archivos
const db = require("../../database/models");
const { Op } = require("sequelize");

//!Modelos
const Products = db.Product;

//!Controlador
const controller = {
  product: async (req, res) => {
    let product = await Products.findByPk(req.params.id);
    return res.json(product);
  },
};

module.exports = controller;
