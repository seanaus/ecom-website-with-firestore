"use strict";
const firebase = require("../db");
const Product = require("../models/product");
const ProductGroup = require("../models/productGroup");
const firestore = firebase.firestore();
let productsArray = [];
let filterParams = [];
let productGroupArray = [];
const loadProductGroups = async () => {
  try {
    productGroupArray = [];

    const productGroup = await firestore.collection("productGroup");
    const data = await productGroup.get();

    if (data.empty) {
      console.log("No Product Group records found");
    } else {
      data.forEach((doc) => {
        const productGroup = new ProductGroup(
          doc.id,
          doc.data().productLevel01Id,
          doc.data().productLevel02Id,
          doc.data().productLevel03Id,
          doc.data().productId
        );
        productGroupArray.push(productGroup);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
  // If Filter Parameters have been passed Apply Them Otherwise Return All Data
  if (filterParams.length > 0) {
    return filterProductGroups(productGroupArray, filterParams);
  } else {
    return productGroupArray;
  }
};
const loadProducts = async (productLevel = "") => {
  try {
    productsArray = [];
    filterParams = [];

    filterParams = setSearchCriteria(productLevel);
    // Build Search List (ProductId List)... built from search criteria
    productGroupArray = await loadProductGroups(filterParams)
    // Get Product Collection
    const products = await firestore.collection("products");
    const data = await products.get();

    if (data.empty) {
      console.log("No product records found");
    } else {
      data.forEach((doc) => {
        const product = new Product(
          doc.id,
          doc.data().name,
          doc.data().description,
          doc.data().imageCard,
          doc.data().image,
          doc.data().unitCost,
          asGBP.format(parseFloat(doc.data().unitCost))
        );
        // Only select products that match search criteria
        if (productGroupArray.includes(doc.id)) {
          productsArray.push(product); 
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
  return productsArray;
};
const setSearchCriteria = (productLevel) => {
  return productLevel === undefined || productLevel === "" ? "*".split("|") : productLevel.split("|");
};
const getProducts = () => {
  if (productsArray) {
    return productsArray;
  } else {
    return false;
  }
};
const getProduct = (id) => {
  let idx = -1;
  if (productsArray) {
    for (let i = 0; i < productsArray.length; i++) {
      if (productsArray[i].id === id) {
        idx = i;
        break;
      }
    }
    if (idx >= 0) {
      return new Product(
        productsArray[idx].id,
        productsArray[idx].name,
        productsArray[idx].description,
        productsArray[idx].imageCard,
        productsArray[idx].image,
        productsArray[idx].unitCost,
        productsArray[idx].formattedCost,
      );
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const filterProductGroups = (sourceArray, paramArray) => {
  if (paramArray[0] == "*") {
    return sourceArray.map(product => { return product.productId });
  } else {
    switch(paramArray.length) {
      case 1:
        return sourceArray.filter(productGroup => productGroup.productLevel01Id == paramArray[0]).map(product => { return product.productId });
      case 2:
        return sourceArray.filter(productGroup => productGroup.productLevel01Id == paramArray[0] && productGroup.productLevel02Id == paramArray[1]).map(product => { return product.productId });
      case 3:
        return sourceArray.filter(productGroup => productGroup.productLevel01Id == paramArray[0] && productGroup.productLevel02Id == paramArray[1] && productGroup.productLevel03Id == paramArray[2]).map(product => { return product.productId })
    }
  }
}
// Sean Austin
// 13/01/2022
// Format numbers to currency in GBP
const asGBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
module.exports = {
  getProducts,
  getProduct,
  loadProducts,
  asGBP
};
