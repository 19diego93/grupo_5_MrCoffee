const productsController = {
  productCart: (req, res) => {
    res.render("products/productCart");
  },
  productDetail: (req, res) => {
    res.render("products/productDetail");
  },
  shop: (req, res) => {
    res.render("products/shop");
  },
};

module.exports = productsController;
