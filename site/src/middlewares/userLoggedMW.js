const User = require("../modelos/Users");

function userLoggedMW(req, res, next) {
  res.locals.isLogged = false;
  let emailCookie = req.cookies.recordame;

  let userFromCookie = User.findByField("email", emailCookie);

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}
module.exports = userLoggedMW;
