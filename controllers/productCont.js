"use strict";
const firebase = require("../db");
const firestore = firebase.firestore();
const { loadSettings } = require("../core/settings");
const { loadConfig } = require("../core/config");
const { loadFilters} = require("../core/filters");
const { activeUser } = require("../core/auth");
const { loadProductData, findProduct } = require("../core/product");
const { getCart } = require("../core/cart");

const renderProducts = async (req, res, next) => {

  const productArray = await loadProductData(req.query.productLevel);
  
  res.render("pages/products", {
    settings: await loadSettings(),
    navbar: await loadConfig("navbar"),
    // filters: await loadConfig("filters"),
    // filters: await loadFilters(),
    filters: await loadFilters(),
    footer: await loadConfig("footer"),
    user: activeUser(),
    products: productArray,
    cart: getCart(),
  });
  next();
};
const renderProduct = async(req, res, next) => {
  const id = req.params.id;
  const product = findProduct(id);
  if (!product) {
    console.log("Product with the given ID not found");
  } else {
    res.render("pages/product", {
      settings: await loadSettings(),
      navbar: await loadConfig("navbar"),
      footer: await loadConfig("footer"),
      user: activeUser(),
      product: product
    });
  }
  next(); 
};
module.exports = {
  renderProducts,
  renderProduct,
};
