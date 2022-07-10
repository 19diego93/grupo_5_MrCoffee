module.exports = (req, res, next) => {
  try {
    if (req.session.userLogged) {
      return res.redirect("/user/profile");
    }
    next();
  } catch {
    (err) => {
      console.log("Hubo un error: ", err);
    };
  }
};
