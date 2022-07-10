module.exports = (req, res, next) => {
  try {
    if (!req.session.userLogged) {
      return res.redirect("/user/login");
    } else {
      next();
    }
  } catch {
    (err) => {
      console.log("Hubo un error: ", err);
    };
  }
};
