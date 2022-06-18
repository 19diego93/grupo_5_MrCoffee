const fs = require("fs");
const path = require("path");
const fsExtra = require('fs-extra');


const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productsController = {
  productCart: (req, res) => {
    let detail = products.filter((producto) => producto.id == req.params.id);
    res.render("products/productCart", { product: detail });
  },
  productDetail: (req, res) => {
    let detail = products.filter((producto) => producto.id == req.params.id);
    res.render("products/productDetail", { product: detail[0] });
  },
  productShop: (req, res) => {
    let productos = [];
    products.filter((producto) => {
      if (producto.stock > 0) {
        productos.push(producto);
      }
    });
    res.render("products/productShop", { productos });
  },
  edit: (req,res)=>{
    let idProduct = req.params.id;
    let productEdit = products.find((item) => item.id == idProduct)
    res.render("products/editor",{productEdit: productEdit})
  },
  // ! Proceso de edición
  edited: (req,res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    req.body.id = req.params.id
let idProduct = req.params.id;
let itemEditado = products.map((item) => {
  if (item.id == idProduct){
   
    item.name=req.body.name 
    item.description=req.body.description 
    // item.category= req.body.category
    item.stock= req.body.stock
    item.price= req.body.price
    item.rating= req.body.rating
  
if (req.file){
  let imgName = req.file.filename;
      item.image ="/img/"+req.body.place+"/"+imgName;
     
    }
    
  }
  return item
 
});


fsExtra.moveSync(`../public/img/${req.file.filename}`, `../public/img/${req.body.place}/${req.file.filename}`);
let actualizedProduct = JSON.stringify(itemEditado, null,2);
		fs.writeFileSync(productsFilePath, actualizedProduct, "utf-8");
		res.redirect(`/products/detail/${idProduct}`);

  },
};

module.exports = productsController;
