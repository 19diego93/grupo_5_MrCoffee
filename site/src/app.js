//' Express | Path | Puerto
const express = require("express");
const path = require("path");
const app = express();

//' Ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//' Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//' Static
app.use(express.static("public"));

//' localhost
app.listen(3000, () => {
  console.log(`MrCoffee listening at http://localhost:3000`);
});

//' Router
const mainRouter = require("./routes/statics/main.js");
const usersRouter = require("./routes/users/users.js");
const adminRouter = require("./routes/admin/admin.js");
const productsRouter = require("./routes/products/products.js");

//' Puertos
app.use("/", mainRouter); //! home
app.use("/user", usersRouter); //! users.js
app.use("/admin", adminRouter); //! admin.js
app.use("/product", productsRouter); //! productos

//' 404
app.use((req, res, next) => {
  res.status(404).render("not-found");
});
