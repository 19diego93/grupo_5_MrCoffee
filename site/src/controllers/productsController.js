const productsController = {
    productCart: (req,res) => {
        res.render('product/productCart');
    },
    productDetail: (req,res) => {
        res.render('product/productDetail');
    },
    shop: (req,res) => {
        res.render('product/shop');
    },    
}

module.exports = productsController