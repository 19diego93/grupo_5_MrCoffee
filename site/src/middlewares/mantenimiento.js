/**
 * If the variable enMantenimiento is true, then render the mantenimiento.ejs file. Otherwise, continue
 * to the next function in the stack.
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 * @param next - This is a function that you call when you want to move on to the next middleware
 * function.
 * @returns The function mantenimiento is being returned.
 */
function mantenimiento(req, res, next) {
  let enMantenimiento = false;
  if (enMantenimiento == true) {
    return res.render("mantenimiento", { title: "│ Pagina en mantenimiento" });
  }
  next();
}

module.exports = mantenimiento;
