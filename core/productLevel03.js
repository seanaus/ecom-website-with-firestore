"use strict";
const firebase = require("../db");
const ProductLevel03 = require("../models/productLevel03");
const firestore = firebase.firestore();

const loadProductLevel03 = async (productLevelHierarchy, productLevel03) => {
  try {
    if (typeof productLevel03 != "undefined") {
      const productLevelData = await firestore
        .collection("productLevel03")
        .doc(productLevel03);
      const data = await productLevelData.get();
      if (!data.empty) {
        const productLevel03 = new ProductLevel03(data.id, data.data().label);
        return productLevel03;
      } else {
        console.log(
          `No ProductLevel03 data found for productLevel03 : ${productLevel03}`
        );
      }
    } else {
      return new ProductLevel03("-1", "UNDEFINED");
    }
  } catch (error) {
    console.log(
      `loadProductLevel03 : ${error.message} productLevelHierarchy : ${productLevelHierarchy} productLevel03 : ${productLevel03}`
    );
  }
};
module.exports = {
  loadProductLevel03,
};
