const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Views
const viewsIndex = path.join(__dirname, "views/index.html");
const viewsRegister = path.join(__dirname, "views/register.html");
const viewsLogin = path.join(__dirname, "views/login.html");
const viewsShoppingCart = path.join(__dirname, "views/shoppingcart.html");
const viewsCheckout = path.join(__dirname, "views/checkout.html");
const viewsForgotten = path.join(__dirname, "views/olvidastecontra.html");
const viewsPepe = path.join(__dirname, "views/pepe.html");
// Static
const publicPath = path.join(__dirname, "public/");
app.use(express.static(publicPath));

// Puertos
app.listen(port, () => {
  console.log(`MrCoffee listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(viewsIndex);
});

app.get("/home", (req, res) => {
  res.sendFile(viewsIndex);
});

app.get("/register", (req, res) => {
  res.sendFile(viewsRegister);
});

app.get("/login", (req, res) => {
  res.sendFile(viewsLogin);
});

app.get("/shoppingcart", (req, res) => {
  res.sendFile(viewsShoppingCart);
});

app.get("/checkout", (req, res) => {
  res.sendFile(viewsCheckout);
});

app.get("/forgottenpassword", (req, res) => {
  res.sendFile(viewsForgotten);
});

app.get("/pepe", (req, res) => {
  res.sendFile(viewsPepe);
});
