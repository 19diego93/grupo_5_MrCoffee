/**
 * If the user is not logged in, redirect them to the login page
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that you call when you want to move on to the next middleware.
 * @returns the result of the redirect.
 */
function authMiddleware(req, res, next) {
  if (!req.session.userLogged) {
    return res.redirect("/user/login");
  }
  next();
}
module.exports = authMiddleware;