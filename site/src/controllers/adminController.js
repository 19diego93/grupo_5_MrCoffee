const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const adminController = {
  viewCreate: (req, res) => {
    res.render("admin/create");
  },
  create: (req, res) => {
    allProducts = products;

    let image = "default-image.png";

    if (req.file != undefined) {
      image = req.file.filename;
    }

    nuevoProduct = {
      id: Date.now() + Date.now() * 100,
      name: req.body.name,
      image: image,
      description: req.body.description,
      category: [req.body.category, req.body.category2],
      stock: parseInt(req.body.stock),
      price: parseInt(req.body.price),
      offer: parseInt(req.body.offer),
    };

    allProducts.push(nuevoProduct);
    let guardar = JSON.stringify(allProducts, null, 2);
    fs.writeFileSync(productsFilePath, guardar, "utf-8");
    res.redirect("/");
  },
  viewEdit: (req, res) => {
    res.render("admin/editProducts", { products });
  },
};

module.exports = adminController;
