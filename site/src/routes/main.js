//! Archivos
const controller = require("../controllers/mainController");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
/* Una ruta que se utilizará para representar el archivo index.ejs. */
router.get("/", controller.index);
/* Una ruta que se usará para representar el archivo search.ejs. */
router.get("/search", controller.search);

module.exports = router;
