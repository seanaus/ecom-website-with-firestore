"use strict";
const firebase = require("../db");
const Product = require("../models/product");
const firestore = firebase.firestore();
const { authUser } = require("../core/auth");
const { loadProducts, getProduct } = require("../core/product");
const { getCart } = require("../cart");

const renderProducts = async (req, res, next) => {
  const productArray = await loadProducts();
  res.render("pages/products", {
    loggedIn: authUser(),
    products: productArray,
    cart: getCart()
  });
  next();
};

const renderProduct = (req, res, next) => {
  const id = req.params.id;
  const product = getProduct(id);
  if (!product) {
    console.log("Product with the given ID not found");
  } else {
    res.render("pages/product", {
      loggedIn: authUser(),
      product: product,
      cart: getCart()
    });
  }
  next();
};
module.exports = {
  renderProducts,
  renderProduct,
};
