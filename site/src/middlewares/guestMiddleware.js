module.exports = (req, res, next) => {
  try {
    if (req.session.userLogged) {
      return res.redirect("/user/profile");
    } else {
      next();
    }
  } catch {
    (err) => {
      console.log("Hubo un error: ", err);
    };
  }
};
