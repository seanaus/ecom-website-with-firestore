"use strict";
const firebase = require("../db");
const ProductLevels = require("../models/productLevels");
const { loadProductLevel01 } = require("./productLevel01");
const { loadProductLevel02 } = require("./productLevel02");
const { loadProductLevel03 } = require("./productLevel03");

const firestore = firebase.firestore();
let productLevelArray = [];

const loadProductLevels = async () => {
  try {
    // productLevelHierarchyArray = [];
    const productLevelsData = await firestore.collection("productLevelHierarchy");
    const data = await productLevelsData.get();
    productLevelArray = [];
    if (data.empty) {
      console.log("No productLevels records found");
    } else {
      data.forEach(async (doc) => {
        try {
          let productLevel01 = "";
          let productLevel02 = "";
          let productLevel03 = "";

          console.log("productLevels - " + doc.id);

          let productLevel01Id =
            typeof doc.data().productLevel01 != "undefined"
              ? doc.data().productLevel01
              : "-1";
          let productLevel02Id =
            typeof doc.data().productLevel02 != "undefined"
              ? doc.data().productLevel02
              : "-1";
          let productLevel03Id =
            typeof doc.data().productLevel03 != "undefined"
              ? doc.data().productLevel03
              : "-1";

          if (productLevel01Id !== "-1") {
            productLevel01 = await loadProductLevel01(doc.id, productLevel01Id);
          }
          if (productLevel02Id !== "-1") {
            productLevel02 = await loadProductLevel02(doc.id, productLevel02Id);
          }
          if (productLevel03Id !== "-1") {
            productLevel03 = await loadProductLevel03(doc.id, productLevel03Id);
          }
          const productLevels = new ProductLevels(
            doc.id,
            productLevel01,
            productLevel02,
            productLevel03,
            doc.data().productLevels
          );
          productLevelArray.push(productLevels);
        } catch (error) {
          console.log("productLevels : " + error.message);
        }
      });
    }
  } catch (error) {
    console.log("productLevels" + error.message);
  }
  return productLevelArray;
  // if (productLevelHierarchyArray.length) {
  //   console.log("LMFAO");
  //   console.log(productLevelHierarchyArray);
  //   return productLevelHierarchyArray;
  // } else {
  //   return false;
  // }
};
module.exports = {
  loadProductLevels
};
