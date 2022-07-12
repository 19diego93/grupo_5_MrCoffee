module.exports = (req, res, next) => {
  try {
    if (req.session.userLogged) {
      let categoria = req.cookies.category;
      if (categoria === "admin") {
        next();
      } else {
        return res.redirect("/user/profile");
      }
    } else {
      next();
    }
  } catch {
    (err) => {
      console.log("Hubo un error: ", err);
    };
  }
};
