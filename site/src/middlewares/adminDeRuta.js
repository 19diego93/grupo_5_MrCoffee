const User = require('../models/Users');

function adminRuta(req, res, next) {
    
  let categoria = req.cookies.admin  
    
  if(!req.session.userLogged && categoria === "admin") {
        res.redirect("/user/login")
    }
      next();
    
}
module.exports = adminRuta;