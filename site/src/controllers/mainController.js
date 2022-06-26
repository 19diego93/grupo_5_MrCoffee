//! Extensiones
const fs = require("fs");
const path = require("path");

//! Archivos
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

//! Controlador
const mainController = {
  index: (req, res) => {
    let categoryCoffee = [];
    let categoryFood = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].category == "coffee" && products[i].stock > 0) {
        categoryCoffee.push(products[i]);
      }
      if (products[i].category == "food" && products[i].stock > 0) {
        categoryFood.push(products[i]);
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

    for (let i = 0; i < products.length; i++) {
      if (products[i].name.includes(busquedaDelUsuario)) {
        resultados.push(products[i]);
      }
    }
    res.render("results", {
      resultados,
      busquedaDelUsuario,
    });
  },
};

module.exports = mainController;
