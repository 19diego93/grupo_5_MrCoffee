let enMantenimiento = false;

function mantenimiento(req, res, next) {
  if (enMantenimiento == true) {
    res.render("mantenimiento");
  }
  if (enMantenimiento == false) {
    next();
  }
}

module.exports = mantenimiento;
