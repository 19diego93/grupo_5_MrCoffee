/**
 * If the user is not logged in, redirect to the login page. If the user is logged in but is not an
 * admin, redirect to the login page. If the user is logged in and is an admin, continue to the next
 * function
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 * @param next - This is a function that you call when you want to move on to the next middleware
 * function in the stack.
 * @returns The function adminRuta is being returned.
 */
function adminRuta(req, res, next) {
  if (!req.session.userLogged) {
    return res.redirect("/user/login");
  }
  if (req.session.userLogged.User_category.name != 'Admin') {
    return res.redirect("/user/error");
  }
  next();
}
module.exports = adminRuta;