"use strict";
const firebase = require("../db");
const ProductLevel03 = require("../models/productLevel03");
const firestore = firebase.firestore();

const loadProductLevel03 = async (id) => {
  try {
    if (typeof (id) != "undefined") {
      const productLevelData = await firestore.collection("productLevel03").doc(id);
      const data = await productLevelData.get();
      if (!data.empty) {
        const productLevel03 = new ProductLevel03(
          data.id,
          data.data().label
        );
        return productLevel03
      } else {
        console.log("NO ProductLevel data found for Id: " + id);
      } 
    } else {
      return new ProductLevel01("-1","FUCK YOU!!!");
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  loadProductLevel03
};
