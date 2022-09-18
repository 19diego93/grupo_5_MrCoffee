//! Express | Path | Puerto
/* Importing the modules that are needed for the app to work. */
const express = require("express");
const path = require("path");
const app = express();
const cookies = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
// .ENV
require("dotenv").config();

//! Ejs
/* Setting the views folder and the view engine. */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//! Middlewares JS
/* Importing the middlewares. */
const mantenimiento = require("./middlewares/mantenimiento.js");
const userLoggedMW = require("./middlewares/userLoggedMW.js");

//! Middlewares
/* Setting up the middleware for the app. */
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookies());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "shh, it's a secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(mantenimiento);
app.use(userLoggedMW);

//! Router
/* Importing the routes. */
const mainRouter = require("./routes/main.js");
const usersRouter = require("./routes/users.js");
const adminRouter = require("./routes/admin.js");
const productsRouter = require("./routes/products.js");
const ApiRouter = require("./routes/api.js");

//! Puertos
/* Telling the app to use the routes that are in the files that are imported. */
app.use("/", mainRouter);
app.use("/user",usersRouter);
app.use("/admin", adminRouter);
app.use("/products", productsRouter);
app.use("/api", ApiRouter);

//! 404
/* A middleware that is used to render a '404' page when the user tries to access a page that does not exist. */
app.use((req, res, next) => {
  res.status(404).render("not-found", { title: "│ Pagina no encontrada" });
});

//! localhost
/* Telling the app to listen to the port 'process.env.APP_PORT' or '3000'. */
let port = process.env.APP_PORT || 3000
app.listen(port, () => {
  console.log(`MrCoffee listening at http://localhost:${port}`);
});
