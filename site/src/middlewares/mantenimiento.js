module.exports = (req, res, next) => {
  let enMantenimiento = false;
  try {
    if (enMantenimiento == true) {
      res.render("mantenimiento");
    } else {
      next();
    }
  } catch {
    (err) => {
      console.log("Hubo un error: ", err);
    };
  }
};
