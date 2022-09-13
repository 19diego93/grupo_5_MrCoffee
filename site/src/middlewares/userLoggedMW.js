/**
 * If the user is logged in, set the isLogged variable to true.
 * @param req - the request object
 * @param res - the response object
 * @param next - The next middleware function in the stack.
 */
function userLoggedMW(req, res, next) {
  console.log(req.session.userLogged);
  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }
  next();
}

module.exports = userLoggedMW;