"use strict";
const firebase = require("../db");
const Product = require("../models/product");
const firestore = firebase.firestore();
let productsArray = [];

const loadProducts = async () => {
  try {
    productsArray = [];

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
          doc.data().unitCost
        );
        productsArray.push(product);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
  if (productsArray.length) {
    return productsArray;
  } else {
    return false;
  }
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
        productsArray[idx].unitCost
      );
    } else {
      return false;
    }
  } else {
    return false;
  }
};
module.exports = {
  getProducts,
  getProduct,
  loadProducts,
};
