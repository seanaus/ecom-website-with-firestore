"use strict";
const firebase = require("../db");
const ProductLevel03 = require("../models/productLevel03");
const firestore = firebase.firestore();
let productLevel03Array = [];

const loadProductLevel03 = async () => {
  try {
    const productLevelData = await firestore.collection("productLevel03");
    const data = await productLevelData.get();
    data.forEach(doc => {
      const productLevel03 = new ProductLevel03(
        doc.id,
        doc.data().label
      )
      productLevel03Array.push(productLevel03);
    });
  } catch (error) {
    console.log(
      `loadProductLevel03 : ${error.message}`
    );
  }
  return productLevel03Array
};
module.exports = {
  loadProductLevel03,
};
