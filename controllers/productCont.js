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
  const filterParams = productLevel.split("|");
  
  const productGroupArray = await loadProductGroups();
  const searchResult = filterProductGroups(productGroupArray, filterParams);
  console.log(searchResult);
  
/*   productGroupArray.forEach((productGroup) => {

    if (productGroup.productLevel01Id == `${filterParams[0]}`) {
      console.log("MATCH-01");
      productLevel01.push(productGroup)
    }
    if (productGroup.productLevel01Id == `${filterParams[0]}` && productGroup.productLevel02Id == `${filterParams[1]}`) {
      console.log("MATCH-02");
      productLevel02.push(productGroup)
    }
    if (productGroup.productLevel01Id == `${filterParams[0]}` && productGroup.productLevel02Id == `${filterParams[1]}` && productGroup.productLevel03Id == `${filterParams[2]}`) {
      console.log("MATCH-03");
      productLevel03.push(productGroup)
    }
  }); */

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
const filterProductGroups = (sourceArray, paramArray) => {

	switch(paramArray.length) {
  	case 1:
		return sourceArray.filter(productGroup => productGroup.productLevel01Id == paramArray[0]);
    		break;
  	case 2:
		return sourceArray.filter(productGroup => productGroup.productLevel01Id == paramArray[0] && productGroup.productLevel02Id == paramArray[1]);
    		break;
  	case 3:
		return sourceArray.filter(productGroup => productGroup.productLevel01Id == paramArray[0] && productGroup.productLevel02Id == paramArray[1] && productGroup.productLevel03Id == paramArray[2])
    		break;
	}
}
module.exports = {
  renderProducts,
  renderFilteredProducts,
  renderProduct,
};
