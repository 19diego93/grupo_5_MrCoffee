const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../public/img/avatar"));
  },
  filename: (req, file, cb) => {
    const newFile = "img-" + Date.now() + path.extname(file.originalname);
    cb(null, newFile);
  },
});
const upload = multer({ storage });

module.exports = upload;
