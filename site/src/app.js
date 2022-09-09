//! Express | Path | Puerto
const express = require("express");
const path = require("path");
const app = express();
const cookies = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");

//! Ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//! Middlewares JS
const mantenimiento = require("./middlewares/mantenimiento.js");
const userLoggedMW = require("./middlewares/userLoggedMW.js");

//! Middlewares
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookies());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "shh, it's a secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(mantenimiento);
app.use(userLoggedMW);

//! Router
const mainRouter = require("./routes/main.js");
const usersRouter = require("./routes/users.js");
const adminRouter = require("./routes/admin.js");
const productsRouter = require("./routes/products.js");
const ApiRouter = require("./routes/api.js");

//! Puertos
app.use("/", mainRouter);
app.use(usersRouter);
app.use(adminRouter);
app.use("/products", productsRouter);
app.use("/api", ApiRouter);

//! 404
// app.use((req, res, next) => {
//   res.status(404).render("not-found", { title: "│ Pagina no encontrada" });
// });

//! localhost
app.listen(3000, () => {
  console.log(`MrCoffee listening at http://localhost:3000`);
});
