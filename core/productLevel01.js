"use strict";
const firebase = require("../db");
const ProductLevel01 = require("../models/productLevel01");
const firestore = firebase.firestore();
let productLevel01Array = [];

const loadProductLevel01 = async () => {
  try {
    const productLevelData = await firestore.collection("productLevel01");
    const data = await productLevelData.get();
    data.forEach(doc => {
      const productLevel01 = new ProductLevel01(
        doc.id,
        doc.data().label
      )
      productLevel01Array.push(productLevel01);
    });
  } catch (error) {
    console.log(
      `loadProductLevel01 : ${error.message}`
    );
  }
  return productLevel01Array
};
module.exports = {
  loadProductLevel01,
};
