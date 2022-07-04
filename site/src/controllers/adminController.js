//! Extensiones
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

//! Archivos
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

//! Controlador
const adminController = {
  viewList: (req, res) => {
    let productos = [];
    products.filter((producto) => {
      if (producto.stock < 1) {
        productos.push(producto);
      }
    });
    res.render("admin/list", { productos });
  },
  viewCreate: (req, res) => {
    res.render("admin/create");
  },
  create: (req, res) => {
    allProducts = products;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let image = "default-image.png";

      if (req.file != undefined) {
        image = req.file.filename;
      }

      nuevoProduct = {
        id: Date.now(),
        name: req.body.name,
        image: image,
        description: req.body.description,
        category: req.body.category,
        stock: parseInt(req.body.stock),
        price: parseInt(req.body.price),
        offer: parseInt(req.body.offer),
        rating: 0,
      };

      allProducts.push(nuevoProduct);
      let update = JSON.stringify(allProducts, null, 2);
      fs.writeFileSync(productsFilePath, update, "utf-8");
      res.redirect("/");
    } else {
      // errors.mapped() Devuelve un objeto Json con un nombre y un objeto en cada nombre.
      // errors.array() Devuelve un array de objetos.
      res.render("admin/create", {
        errors: errors.mapped(),
        oldDate: req.body,
      });
    }
  },
  viewEdit: (req, res) => {
    allProducts = products;

    let edit = allProducts.filter((product) => product.id == req.params.id);
    res.render("admin/edit", { edit: edit[0] });
  },
  update: (req, res) => {
    allProducts = products;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let image = req.body.oldImage;

      if (req.file != undefined) {
        image = req.file.filename;
        let filePath = path.resolve(
          __dirname,
          "../../public/img/products/" + req.body.oldImage
        );
        try {
          fs.unlinkSync(filePath);
          // console.log("-----");
          // console.log("Se borro la imagen :)");
          // console.log("-----");
        } catch (error) {
          console.error("No se pudo eliminar la imagen anterior");
          console.error(error.message);
        }
        //! Otra forma de borrar
        // fs.unlink(filePath, callback);
        // function callback(error) {
        //   if (error) {
        //     console.log("error al borrar la imagen");
        //     console.error(error.message);
        //   } else {
        //     console.log("Imagen borrada");
        //   }
        // }
      }

      if (!req.body.rating.length > 0) {
        req.body.rating = 0;
      }

      editProduct = {
        id: parseInt(req.params.id),
        name: req.body.name,
        image: image,
        description: req.body.description,
        category: req.body.category,
        stock: parseInt(req.body.stock),
        price: parseInt(req.body.price),
        offer: parseInt(req.body.offer),
        rating: parseFloat(req.body.rating),
      };

      let edited = allProducts.map((product) => {
        if (product.id == req.params.id) {
          return (product = editProduct);
        }
        return product;
      });

      let update = JSON.stringify(edited, null, 2);
      fs.writeFileSync(productsFilePath, update, "utf-8");
      res.redirect("/");
    } else {
      let edit = allProducts.filter((product) => product.id == req.params.id);
      if (req.file) {
        let filePath = path.resolve(
          __dirname,
          "../../public/img/products/" + req.file.filename
        );
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          console.error("No se pudo eliminar la imagen anterior");
          console.error(error.message);
        }
      }
      res.render("admin/edit", {
        errors: errors.mapped(),
        oldDate: req.body,
        edit: edit[0],
      });
    }
  },
  destroy: (req, res) => {
    allProducts = products;

    let destroy = req.params.id;

    allProducts.filter((product) => {
      if (product.id == destroy) {
        let filePath = path.resolve(
          __dirname,
          "../../public/img/products/" + product.image
        );
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          console.error("No se pudo eliminar la imagen anterior");
          console.error(error.message);
        }
      }
    });

    let destroying = allProducts.filter((product) => {
      return product.id != destroy;
    });

    let update = JSON.stringify(destroying, null, 2);
    fs.writeFileSync(productsFilePath, update, "utf-8");

    res.redirect("/");
  },
};

module.exports = adminController;
