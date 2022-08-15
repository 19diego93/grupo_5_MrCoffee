function adminRuta(req, res, next) {
  try {
    if (req.session.userLogged) {
      let categoria = req.session.userLogged.dataValues.id_category_U;

      if (categoria == "1") {
        next();
      } else {
        res.redirect("/user/login");
      }
    } else {
      res.redirect("/user/login");
    }
  } catch (e) {
    console.log("Hubo un error: ", e);
  }
}
module.exports = adminRuta;
