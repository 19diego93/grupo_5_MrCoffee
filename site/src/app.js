//' Express | Path | Puerto
const express = require("express");
const path = require("path");
const app = express();

//' Router
const mainRouter = require("./routes/main.js");

//' Ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//' Static
app.use(express.static(path.join(__dirname, "../public/")));

//' localhost
app.listen(3000, () => {
  console.log(`MrCoffee listening at http://localhost:3000`);
});

//' Puertos
app.use("/", mainRouter);
app.use("/login");
app.use("/register");
//!
