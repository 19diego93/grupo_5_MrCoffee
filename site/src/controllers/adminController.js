//! Extensiones
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

//! Archivos
const db = require("../database/models");
const { Op } = require("sequelize");

//!Modelos
const Products = db.Product;

//! Controlador
const adminController = {
  viewList: async (req, res) => {
    try {
      let products = await Products.findAll({
        where: {
          stock: { [Op.eq]: 0 },
        },
      });

      return res.render("admin/list", {
        products,
        title: "│ Productos agotados",
      });
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },

  viewCreate: (req, res) => {
    res.render("admin/create", { title: "│ Creación de productos" });
  },

  create: async (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let image;

      if (req.file) {
        image = req.file.filename;
      } else {
        image = "default-image.png";
      }

      let categoria;

      if (req.body.category == "coffee") {
        categoria = 1;
      } else if (req.body.category == "food") {
        categoria = 2;
      }
      let randomNum = Math.floor(Math.random() * 999999999 + 5);

      let newProduct = {
        id: randomNum,
        name: req.body.name,
        image: image,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price,
        offer: req.body.offer,
        rating: 0,
        id_categoryP: categoria,
      };
      let product = await Products.create(newProduct);

      res.redirect("/products/detail/" + product.id);
    } else {
      if (req.file) {
        let filePath = path.resolve(
          __dirname,
          "../../public/img/products/" + req.file.filename
        );
        fs.unlinkSync(filePath);
      }

      // errors.mapped() Devuelve un objeto Json con un nombre y un objeto en cada nombre.
      // errors.array() Devuelve un array de objetos.
      res.render("admin/create", {
        errors: errors.mapped(),
        oldDate: req.body,
        title: "│ Creación de productos",
      });
    }
  },
  viewEdit: async (req, res) => {
    let productEdit = await Products.findByPk(req.params.id);
    productEdit.dataValues.price = Math.round(productEdit.dataValues.price);

    return res.render("admin/edit", {
      edit: productEdit,
      title: "│ Edición de productos",
    });
  },
  update: async (req, res) => {
    try {
      let product = await Products.findByPk(req.params.id);
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let image = product.dataValues.image;

        if (req.file) {
          image = req.file.filename;
          let filePath = path.resolve(
            __dirname,
            "../../public/img/products/" + product.dataValues.image
          );
          fs.unlinkSync(filePath);
        }

        let categoria;
        if (req.body.category == "coffee") {
          categoria = 1;
        } else if (req.body.category == "food") {
          categoria = 2;
        }

        let newProduct = {
          id: product.dataValues.id,
          name: req.body.name,
          image: image,
          description: req.body.description,
          stock: req.body.stock,
          price: req.body.price,
          offer: req.body.offer,
          rating: product.dataValues.rating,
          id_categoryP: categoria,
        };

        await Products.update(
          { ...newProduct },
          {
            where: { id: req.params.id },
          }
        );

        res.redirect("/");
      } else {
        if (req.file) {
          let filePath = path.resolve(
            __dirname,
            "../../public/img/products/" + req.file.filename
          );
          fs.unlinkSync(filePath);
        }

        res.render("admin/edit", {
          errors: errors.mapped(),
          oldDate: req.body,
          edit: product,
          title: "│ Edición de productos",
        });
      }
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },

  destroy: async (req, res) => {
    try {
      let product = await Products.findByPk(req.params.id);

      if (product) {
        await product.destroy();

        if (product.dataValues.image != "default-image.png") {
          let filePath = path.resolve(
            __dirname,
            "../../public/img/products/" + product.dataValues.image
          );
          fs.unlinkSync(filePath);
        }

        res.redirect("/");
      } else {
        console.log("Hubo un error borrando el producto: ", product);
      }
    } catch (e) {
      console.log("Hubo un error: ", e);
    }
  },
};

module.exports = adminController;
