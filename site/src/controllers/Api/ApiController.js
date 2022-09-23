//! Archivos
const db = require("../../database/models");
const { Op } = require("sequelize");

//!Modelos
const Products = db.Product;
const Ventas = db.Venta;
const venta_detalle = db.venta_detalle;

//!Controlador
const controller = {
  product: async (req, res) => {
    /* Obtener el producto por su id. */
    let product = await Products.findByPk(req.params.id);
    /* Devolver un objeto JSON con el producto. */
    return res.json({ ok: true, status: 200, product: product });
  },

  checkout: async (req, res) => {
    /* Comprobando si el usuario está logueado. */
    if (!req.session || !req.session.userLogged) {
      return res.json({
        ok: false,
        status: 401,
        response: "Por favor inicie sesión.",
      });
    }

    /* Creación de una nueva venta. */
    let newSales = await Ventas.create({
      ...req.body,
      user_id: req.session.userLogged.id,
      estado_id: 1,
    });

    /* Agregar los productos a la venta. */
    req.body.Venta_detalle.forEach((Element) => {
      newSales.addDetail(Element.product_id, { through: { ...Element } });
    });

    res.json({ ok: true, status: 201 });
  },

  orders: async (req, res) => {
    /* Comprobando si el usuario está logueado. */
    if (!req.session || !req.session.userLogged) {
      return res.json({
        ok: false,
        status: 401,
        response: "Por favor inicie sesión.",
      });
    }

    /* Obtener todas las ventas de la base de datos. */
    let sales = await Ventas.findAll({
      where: {
        user_id: { [Op.eq]: req.session.userLogged.id },
      },
      include: [{ association: "Detail" }, { association: "Venta_estado" }],
    });

    /* Devolviendo un objeto JSON con el código de estado 200 y el objeto de ventas. */
    res.json({ ok: true, status: 200, sales });
  },

  ordersDetail: async (req, res) => {
    let orderDetail = await venta_detalle.findAll({
      where: {
        ventas_id: { [Op.eq]: req.params.id },
      },
    });

    res.json({ ok: true, status: 200, orderDetail });
  },
};

module.exports = controller;
