"use strict";
const firebase = require("../db");
const firestore = firebase.firestore();
const { loadSettings } = require("../core/settings");
const { loadConfig } = require("../core/config");
const { activeUser } = require("../core/auth");
const { loadProducts, loadProductGroups, getProduct } = require("../core/product");
const { getCart } = require("../core/cart");

const renderProducts = async (req, res, next) => {
  const productArray = await loadProducts();
  res.render("pages/products", {
    settings: await loadSettings(),
    navbar: await loadConfig("navbar"),
    filters: await loadConfig("filters"),
    footer: await loadConfig("footer"),
    user: activeUser(),
    products: productArray,
    cart: getCart(),
  });
  next();
};
const renderFilteredProducts = async (req, res, next) => {
  // const productLevel01Id = req.query.productLevel01Id;
  // const productLevel02Id = req.query.productLevel02Id;
  // const productLevel03Id = req.query.productLevel03Id;
  const productLevel = req.query.productLevel;
  const productGroupArray = await loadProductGroups();

  // const filteredBy01 = productGroupArray.filter((productGroup) => {
  //   return productGroup.productLevel01Id == productLevel01Id
  // })
  // const filteredBy02 = filteredBy01.filter((productGroup) => {
  //   return productGroup.productLevel02Id == productLevel02Id
  // }) 
  // const filteredBy03 = filteredBy02.filter((productGroup) => {
  //   return productGroup.productLevel03Id == productLevel03Id
  // }) 

  // console.log(`renderFilteredProducts ${filteredBy01.id}`);
  // console.log(`renderFilteredProducts ${filteredBy02.id}`);
  // console.log(`renderFilteredProducts ${filteredBy03.id}`);

  console.log(`renderFilteredProducts ${productLevel}`);

  const productArray = await loadProducts();
  res.render("pages/products", {
    settings: await loadSettings(),
    navbar: await loadConfig("navbar"),
    filters: await loadConfig("filters"),
    footer: await loadConfig("footer"),
    user: activeUser(),
    productGroups: await loadProductGroups(),
    products: productArray,
    cart: getCart(),
  });
  next();
};
const renderProduct = async(req, res, next) => {
  const id = req.params.id;
  const product = getProduct(id);
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
  renderFilteredProducts,
  renderProduct,
};
