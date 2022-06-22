const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const adminController = require(path.join(
  __dirname,
  "/../../controllers/adminController"
));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../public/img/products"));
  },
  filename: (req, file, cb) => {
    const newFile = "img-" + Date.now() + path.extname(file.originalname);
    cb(null, newFile);
  },
});
const upload = multer({ storage });

router.get("/create", adminController.viewCreate);
router.post("/", upload.single("image"), adminController.create);

router.get("/edit", adminController.viewEdit);

module.exports = router;
