//! Archivos
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//!Modelos
const Products = db.Product;

//! Controlador
const mainController = {
  list: (req, res) => {
    Products.findAll({
      where: {
        stock: { [Op.gt]: 0 },
      },
      order: [["rating", "DESC"]],
    })
      .then((product) => {
        let coffee = [];
        let food = [];

        product.forEach((e) => {
          if (e.id_categoryP == "1") {
            coffee.push(e);
          }
          if (e.id_categoryP == "2") {
            food.push(e);
          }
        });

        if (coffee.length >= 4 || food.length >= 4) {
          coffee.splice(3);
          food.splice(3);
        } else {
          console.log("No son mas de 3 productos");
        }

        return res.render("index", { coffee, food });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  index: (req, res) => {
    let categoryCoffee = [];
    let categoryFood = [];

    for (let i = 0; i < Products.length; i++) {
      if (Products[i].category == "coffee" && Products[i].stock > 0) {
        categoryCoffee.push(Products[i]);
      }
      if (Products[i].category == "food" && Products[i].stock > 0) {
        categoryFood.push(Products[i]);
      }
    }

    let acomodandoCoffee = categoryCoffee.sort((a, b) => {
      if (a.rating < b.rating) {
        return 1;
      }
      if (a.rating > b.rating) {
        return -1;
      }
      return 0;
    });
    let acomodandoFood = categoryFood.sort((a, b) => {
      if (a.rating < b.rating) {
        return 1;
      }
      if (a.rating > b.rating) {
        return -1;
      }
      return 0;
    });
    let coffee = [];
    let food = [];
    for (let i = 0; i < 3; i++) {
      coffee.push(acomodandoCoffee[i]);
      food.push(acomodandoFood[i]);
    }
    res.render("index", { coffee, food });
  },

  search: (req, res) => {
    let busquedaDelUsuario = req.query.keywords;
    let resultados = [];

    for (let i = 0; i < Products.length; i++) {
      if (Products[i].name.includes(busquedaDelUsuario)) {
        resultados.push(Products[i]);
      }
    }
    res.render("results", {
      resultados,
      busquedaDelUsuario,
    });
  },
};

module.exports = mainController;
