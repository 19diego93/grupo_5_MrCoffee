//' Express | Path | Puerto
const express = require("express");
const path = require("path");
const usersController = require("./controllers/usersController.js");
const app = express();

//' Router
const mainRouter = require("./routes/statics/main.js");
const usersRouter = require("./routes/users/users.js");
//' Ejs
app.set(
  "views",

  path.join(__dirname, "views")
);
app.set("view engine", "ejs");

//' Static
app.use(express.static("public"));

//' localhost
app.listen(3000, () => {
  console.log(`MrCoffee listening at http://localhost:3000`);
});

//' Puertos
app.use("/", mainRouter);
app.get("/login", usersRouter);
app.get("/register", usersRouter);
app.get("/profile", usersRouter);
//!
