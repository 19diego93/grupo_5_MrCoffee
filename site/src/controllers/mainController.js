//! Archivos
const db = require("../database/models");
const { Op } = require("sequelize");

//!Modelos
const Products = db.Product;

//! Controlador
const mainController = {
  index: async (req, res) => {
    try {
      let coffee = await Products.findAll({
        where: {
          stock: { [Op.gt]: 0 },
          id_categoryP: { [Op.like]: "%1%" },
        },
        order: [["rating", "DESC"]],
        limit: 3,
      });
      let food = await Products.findAll({
        where: {
          stock: { [Op.gt]: 0 },
          id_categoryP: { [Op.like]: "%2%" },
        },
        order: [["rating", "DESC"]],
        limit: 3,
      });

      return res.render("index", { coffee, food, title: "" });
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },

  search: async (req, res) => {
    try {
      let results = await Products.findAll({
        where: {
          name: { [Op.like]: `%${req.query.keywords}%` },
        },
        order: [["rating", "DESC"]],
      });

      return res.render("results", {
        results,
        busquedaDelUsuario: req.query.keywords,
        title: "│ Resultados",
      });
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },
};

module.exports = mainController;
