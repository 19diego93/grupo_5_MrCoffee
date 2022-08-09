function adminRuta(req, res, next) {
  let categoria = req.cookies.category;

  if (categoria == "1") {
    next();
  } else {
    res.redirect("/user/login");
  }
}
module.exports = adminRuta;
