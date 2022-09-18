//! Archivos
const db = require("../../database/models");
const { Op } = require("sequelize");

//!Modelos
const Products = db.Product;
const Ventas = db.Venta;

//!Controlador
const controller = {
  product: async (req, res) => {
    let product = await Products.findByPk(req.params.id);
    return res.json({ ok: true, status: 200, product: product });
  },

  checkout: async (req, res) => {
    if (!req.session || !req.session.userLogged) {
      return res.json({
        ok: false,
        status: 401,
        response: "Por favor inicie sesión.",
      });
    }

    let newSales = await Ventas.create({
      ...req.body,
      user_id: req.session.userLogged.id,
    });

    req.body.Venta_detalle.forEach((Element) => {
      console.log(Element);
      newSales.addDetail(Element.product_id, { through: { ...Element } });
    });

    res.json({ ok: true, status: 201 });
  },

  orders: async (req, res) => {
    if (!req.session || !req.session.userLogged) {
      return res.json({
        ok: false,
        status: 401,
        response: "Por favor inicie sesión.",
      });
    }

    let sales = await Ventas.findAll({
      where: {
        user_id: { [Op.eq]: req.session.userLogged.id },
      },
      include: [{ association: "Detail" }],
    });

    res.json({ ok: true, status: 201, sales });
  },
};

module.exports = controller;