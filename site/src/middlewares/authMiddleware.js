function authMiddleware(req, res, next) {
  try {
    if (!req.session.userLogged) {
      return res.redirect("/user/login");
    } else {
      next();
    }
  } catch (e) {
    console.log("Hubo un error: ", e);
  }
}

module.exports = authMiddleware;
