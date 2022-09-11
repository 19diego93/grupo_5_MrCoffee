/**
 * If the user is logged in, redirect to the profile page. Otherwise, continue to the next middleware
 * @param req - the request object
 * @param res - The response object.
 * @param next - This is a function that you call when you're done with your middleware.
 * @returns the result of the res.redirect() function.
 */
function guestMiddleware(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect("/user/profile");
  }
  next();
}

module.exports = guestMiddleware;
