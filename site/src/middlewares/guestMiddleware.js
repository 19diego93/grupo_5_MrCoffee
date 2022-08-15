function guestMiddleware(req, res, next) {
  try {
    if (req.session.userLogged) {
      return res.redirect("/user/profile");
    } else {
      next();
    }
  } catch (e) {
    console.log("Hubo un error: ", e);
  }
}

module.exports = guestMiddleware;
