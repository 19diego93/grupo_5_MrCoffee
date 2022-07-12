module.exports = (req, res, next) => {
  res.locals.category = false;
  let categoria = req.cookies.category;

  if (categoria === "admin") {
    res.locals.category = true;
  }
  next();
};
