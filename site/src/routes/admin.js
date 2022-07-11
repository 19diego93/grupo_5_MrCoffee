//! Archivos
const controller = require("../controllers/adminController");
const creation = require("../controllers/validations/productCreate");
const edit = require("../controllers/validations/productEdit");
const upload = require("./multer/admin");

//! Extensiones
const express = require("express");
const router = express.Router();

//!Middlewares
const adminDeRuta = require("../middlewares/adminDeRuta")

//! Rutas
router.get("/admin/list",adminDeRuta, controller.viewList);

router.get("/admin/create",adminDeRuta, controller.viewCreate);
router.post("/admin/", upload.single("image"), creation, controller.create);

router.get("/admin/edit/:id",adminDeRuta, controller.viewEdit);
router.put(
  "/admin/:id/update",
  upload.single("image"),
  edit,
  controller.update
);

router.delete("/admin/:id", controller.destroy);

module.exports = router;
