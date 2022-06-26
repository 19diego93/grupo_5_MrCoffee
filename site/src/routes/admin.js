//! Archivos
const controller = require("../controllers/adminController");
const creation = require("../controllers/validations/create");
const edit = require("../controllers/validations/edit");

//! Extensiones
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/img/products"));
  },
  filename: (req, file, cb) => {
    const newFile = "img-" + Date.now() + path.extname(file.originalname);
    cb(null, newFile);
  },
});
const upload = multer({ storage });

//! Rutas
router.get("/list", controller.viewList);

router.get("/create", controller.viewCreate);
router.post("/", upload.single("image"), creation, controller.create);

router.get("/edit/:id", controller.viewEdit);
router.put("/:id/update", upload.single("image"), edit, controller.update);

router.delete("/:id", controller.destroy);

module.exports = router;
