//' Express | Path | Puerto
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//' Views-Html | Http
const viewsIndex = path.join(__dirname, "views/index.html");
const httpIndex = "/";
const httpHome = "/home";
//!
const viewsLogin = path.join(__dirname, "views/login.html");
const httpLogin = "/login";
//!
const viewsProductCart = path.join(__dirname, "views/productCart.html");
const httpProductCart = "/productCart";
//!
const viewsProductDetail = path.join(__dirname, "views/productDetail.html");
const httpProductDetail = "/productDetail";
//!
const viewsRegister = path.join(__dirname, "views/register.html");
const httpRegister = "/register";

//' Static
const publicPath = path.join(__dirname, "public/");
app.use(express.static(publicPath));

//' localhost
app.listen(port, () => {
  console.log(`MrCoffee listening at http://localhost:${port}`);
});

//' Puertos
app.get(httpIndex, (req, res) => {
  res.sendFile(viewsIndex);
});
//!
app.get(httpHome, (req, res) => {
  res.sendFile(viewsIndex);
});
//!
app.get(httpLogin, (req, res) => {
  res.sendFile(viewsLogin);
});
//!
app.get(httpProductCart, (req, res) => {
  res.sendFile(viewsProductCart);
});
//!
app.get(httpProductDetail, (req, res) => {
  res.sendFile(viewsProductDetail);
});
//!
app.get(httpRegister, (req, res) => {
  res.sendFile(viewsRegister);
});
