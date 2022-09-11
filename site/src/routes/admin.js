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
router.get("/list", adminDeRuta, controller.viewList);

router.get("/create", adminDeRuta, controller.viewCreate);
router.post(
  "/",
  adminDeRuta,
  upload.single("image"),
  creation,
  controller.create
);

router.get("/edit/:id", adminDeRuta, controller.viewEdit);
router.put(
  "/:id/update",
  adminDeRuta,
  upload.single("image"),
  edit,
  controller.update
);

router.delete("/:id", adminDeRuta, controller.destroy);

module.exports = router;
