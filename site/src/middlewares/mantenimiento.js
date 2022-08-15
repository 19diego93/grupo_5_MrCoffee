function mantenimiento(req, res, next) {
  try {
    let enMantenimiento = false;
    if (enMantenimiento == true) {
      res.render("mantenimiento", { title: "│ Pagina en mantenimiento" });
    } else {
      next();
    }
  } catch (e) {
    console.log("Hubo un error: ", e);
  }
}

module.exports = mantenimiento;
