const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const adminController = {
  createProducts: (req, res) => {
    res.render("admin/createProducts");
  },
  editProducts: (req, res) => {
    res.render("admin/editProducts", { products });
  },
};

module.exports = adminController;
