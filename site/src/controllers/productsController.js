const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productsController = {
  productCart: (req, res) => {
    res.render("products/productCart");
  },
  productDetail: (req, res) => {
    res.render("products/productDetail");
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
