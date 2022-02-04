"use strict";
const firebase = require("../db");
const ProductLevel02 = require("../models/productLevel02");
const firestore = firebase.firestore();

const loadProductLevel02 = async (productLevel, productLevel02) => {
  try {
    if (typeof ProductLevel02 != "undefined") {
      const productLevelData = await firestore
        .collection("productLevel02")
        .doc(productLevel02);
      const data = await productLevelData.get();
      if (!data.empty) {
        const productLevel02 = new ProductLevel02(data.id, data.data().label);
        return productLevel02;
      } else {
        console.log(
          `No ProductLevel02 data found for productLevel02 : ${productLevel02}`
        );
      }
    } else {
      return new ProductLevel02("-1", "UNDEFINED");
    }
  } catch (error) {
    console.log(
      `loadProductLevel02 : ${error.message} productLevel : ${productLevel} productLevel02 : ${productLevel02}`
    );
  }
};
module.exports = {
  loadProductLevel02,
};
