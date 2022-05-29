const productsController = {
  productCart: (req, res) => {
    res.render("products/productCart");
  },
  productDetail: (req, res) => {
    res.render("products/productDetail");
  },
  productShop: (req, res) => {
    res.render("products/productShop");
  },
};

module.exports = productsController;
