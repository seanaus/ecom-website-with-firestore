"use strict";
const firebase = require("../db");
const ProductLevel01 = require("../models/productLevel01");
const firestore = firebase.firestore();

const loadProductLevel01 = async (productLevel, productLevel01) => {
  try {
    if (typeof productLevel01 != "undefined") {
      const productLevelData = await firestore
        .collection("productLevel01")
        .doc(productLevel01);
      const data = await productLevelData.get();
      if (!data.empty) {
        const productLevel01 = new ProductLevel01(data.id, data.data().label);
        return productLevel01;
      } else {
        console.log(
          `No ProductLevel01 data found for productLevel01 : ${productLevel01}`
        );
      }
    } else {
      return new ProductLevel01("-1", "UNDEFINED");
    }
  } catch (error) {
    console.log(
      `loadProductLevel01 : ${error.message} productLevel : ${productLevel} productLevel01 : ${productLevel01}`
    );
  }
};
module.exports = {
  loadProductLevel01,
};
