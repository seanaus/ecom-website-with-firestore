"use strict";
const firebase = require("../db");
const ProductLevel02 = require("../models/productLevel02");
const firestore = firebase.firestore();
let productLevel02Array = [];

const loadProductLevel02 = async () => {
  try {
    const productLevelData = await firestore.collection("productLevel02");
    const data = await productLevelData.get();
    data.forEach(doc => {
      const productLevel02 = new ProductLevel02(
        doc.id,
        doc.data().label
      )
      productLevel02Array.push(productLevel02);
    });
  } catch (error) {
    console.log(
      `loadProductLevel02 : ${error.message}`
    );
  }
  return productLevel02Array
};
module.exports = {
  loadProductLevel02,
};
