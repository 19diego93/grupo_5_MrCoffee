//! Archivos
const controller = require("../controllers/adminController");
const creation = require("../controllers/validations/create");
const edit = require("../controllers/validations/edit");
const upload = require("./multer/admin");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
router.get("/list", controller.viewList);

router.get("/create", controller.viewCreate);
router.post("/", upload.single("image"), creation, controller.create);

router.get("/edit/:id", controller.viewEdit);
router.put("/:id/update", upload.single("image"), edit, controller.update);

router.delete("/:id", controller.destroy);

module.exports = router;
