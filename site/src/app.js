//! Express | Path | Puerto
const express = require("express");
const path = require("path");
const app = express();
const mantenimiento = require("./middlewares/mantenimiento.js");
const userLoggedMW = require("./middlewares/userLoggedMW.js");
const adminGlobal = require("./middlewares/adminGlobal.js");
const cookies = require('cookie-parser');
//! Session
const session = require("express-session");

//! Ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//! Middlewares
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookies());
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(mantenimiento);
app.use(
  session({
    secret: "shh, it's a secret",
    resave: false,
    saveUninitialized: false,
  })
);
// ?este middlewares solo funciona luego de que se inicie la session
app.use(userLoggedMW);
app.use(adminGlobal);


//! localhost
app.listen(3000, () => {
  console.log(`MrCoffee listening at http://localhost:3000`);
});

//! Router
const mainRouter = require("./routes/main.js");
const usersRouter = require("./routes/users.js");
const adminRouter = require("./routes/admin.js");
const productsRouter = require("./routes/products.js");
const { cookie } = require("express-validator");

//! Puertos
app.use("/", mainRouter);
app.use(usersRouter);
app.use(adminRouter);
app.use(productsRouter);

//! 404
// app.use((req, res, next) => {
//   res.status(404).render("not-found");
// });
