//! Archivos
const controller = require("../controllers/adminController");
const creation = require("../controllers/validations/productCreate");
const edit = require("../controllers/validations/productEdit");
const upload = require("./multer/admin");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
router.get("/admin/list", controller.viewList);

router.get("/admin/create", controller.viewCreate);
router.post("/admin/", upload.single("image"), creation, controller.create);

router.get("/admin/edit/:id", controller.viewEdit);
router.put(
  "/admin/:id/update",
  upload.single("image"),
  edit,
  controller.update
);

router.delete("/admin/:id", controller.destroy);

module.exports = router;
