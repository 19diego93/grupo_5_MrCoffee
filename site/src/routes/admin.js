//! Archivos
const controller = require("../controllers/adminController");
const creation = require("./validations/productCreate");
const edit = require("./validations/productEdit");
const upload = require("./multer/admin");

//! Extensiones
const express = require("express");
const router = express.Router();

//!Middlewares
const adminDeRuta = require("../middlewares/adminDeRuta");

//! Rutas
router.get("/admin/list", adminDeRuta, controller.viewList);

router.get("/admin/create", adminDeRuta, controller.viewCreate);
router.post(
  "/admin/",
  adminDeRuta,
  upload.single("image"),
  creation,
  controller.create
);

router.get("/admin/edit/:id", adminDeRuta, controller.viewEdit);
router.put(
  "/admin/:id/update",
  adminDeRuta,
  upload.single("image"),
  edit,
  controller.update
);

router.delete("/admin/:id", adminDeRuta, controller.destroy);

module.exports = router;
