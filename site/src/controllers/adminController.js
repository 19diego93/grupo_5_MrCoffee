const { Console } = require("console");
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
      rating: 0,
    };

    allProducts.push(nuevoProduct);
    let update = JSON.stringify(allProducts, null, 2);
    fs.writeFileSync(productsFilePath, update, "utf-8");
    res.redirect("/");
  },
  viewEdit: (req, res) => {
    allProducts = products;

    let edit = allProducts.filter((product) => product.id == req.params.id);
    res.render("admin/edit", { edit: edit[0] });
  },
  update: (req, res) => {
    allProducts = products;

    let imagen = allProducts.filter((product) => {
      if (product.id == req.params.id) {
        return product.image;
      }
    });
    let image = imagen[0].image;

    let calificacion = allProducts.filter((product) => {
      if (product.id == req.params.id) {
        return product;
      }
    });
    let rating = calificacion[0].rating;
    console.log(calificacion);
    if (rating == undefined) {
      rating = 0;
    }

    if (req.file != undefined) {
      image = req.file.filename;
    }
    let category = [];
    if (req.body.category) {
      category.push(req.body.category);
    }
    if (req.body.category2 != "undefined") {
      category.push(req.body.category2);
    }
    editProduct = {
      id: parseInt(req.params.id),
      name: req.body.name,
      image: image,
      description: req.body.description,
      category: category,
      stock: parseInt(req.body.stock),
      price: parseInt(req.body.price),
      offer: parseInt(req.body.offer),
      rating: rating,
    };

    if (!editProduct.stock > 0) {
      editProduct.stock = 0;
    }
    if (!editProduct.price > 0) {
      editProduct.price = 0;
    }
    if (!editProduct.offer > 0) {
      editProduct.offer = 0;
    }
    console.log(editProduct);

    let edited = allProducts.map((product) => {
      if (product.id == req.params.id) {
        return (product = editProduct);
      }
      return product;
    });

    let update = JSON.stringify(edited, null, 2);
    fs.writeFileSync(productsFilePath, update, "utf-8");
    res.redirect("/");
  },

  destroy: (req, res) => {
    allProducts = products;

    let destroy = req.params.id;

    let destroying = allProducts.filter((product) => {
      return product.id != destroy;
    });

    let update = JSON.stringify(destroying, null, 2);
    fs.writeFileSync(productsFilePath, update, "utf-8");

    res.redirect("/");
  },
};

module.exports = adminController;
