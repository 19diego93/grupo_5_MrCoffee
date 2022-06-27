//! Extensiones
const fs = require("fs");
const path = require("path");

//! Archivos
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

//!Controlador
const productsController = {
  productCart: (req, res) => {
    let detail = products.filter((producto) => producto.id == req.params.id);
    res.render("products/productCart", { product: detail });
  },
  productDetail: (req, res) => {
    let detail = products.filter((producto) => producto.id == req.params.id);
    res.render("products/productDetail", { product: detail[0] });
  },
  productShop: (req, res) => {
    let productos = [];
    products.filter((producto) => {
      if (producto.stock > 0) {
        productos.push(producto);
      }
    });
    res.render("products/productShop", { productos });
  },
};

module.exports = productsController;
