const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

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
  edit: (req, res) => {
    let idProduct = req.params.id;
    let productEdit = products.find((item) => item.id == idProduct);
    res.render("admin/editProducts", { productEdit: productEdit });
  },
  // ! Proceso de edición
  edited: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    req.body.id = req.params.id;
    let idProduct = req.params.id;
    let itemEditado = products.map((item) => {
      if (item.id == idProduct) {
        
        let product = {
          id: idProduct,
          name: req.body.name,
          image: item.image,
          description: req.body.description,
          category: item.category,
          stock: req.body.stock,
          price: req.body.price,
          rating: req.body.rating,
        };

        let reqBodyCategory = req.body.category;
        let toArray = reqBodyCategory.split(",");
        product.category = toArray
        
        if (req.file) {
          product.image = "/img/" + req.body.place + "/" + req.file.filename;
          fsExtra.moveSync(
            `../public/img/${req.file.filename}`,
            `../public/img/${req.body.place}/${req.file.filename}`
          );
        }
        return product;
      }
      return item;
    });

    let actualizedProduct = JSON.stringify(itemEditado, null, 2);
    fs.writeFileSync(productsFilePath, actualizedProduct, "utf-8");
    res.redirect(`/products/detail/${idProduct}`);
  },
};

module.exports = productsController;
