function adminRuta(req, res, next) {
  let categoria = req.session.userLogged.dataValues.id_category_U;

  if (categoria == "1") {
    next();
  } else {
    res.redirect("/user/login");
  }
}
module.exports = adminRuta;
