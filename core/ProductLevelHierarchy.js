"use strict";
const firebase = require("../db");
const ProductLevelHierarchy = require("../models/productLevelHierarchy");
const { loadProductLevel01 } = require("../core/productLevel01");
const { loadProductLevel02 } = require("../core/productLevel02");
const { loadProductLevel03 } = require("../core/productLevel03");

const firestore = firebase.firestore();
let productLevelArray = [];

const loadProductLevelHierarchy2 = async () => {
  const test = await loadProductLevelHierarchy();
  console.log(test);
};

const loadProductLevelHierarchy = async () => {
  try {
    // productLevelHierarchyArray = [];
    const productLevelHierarchyData = await firestore.collection(
      "productLevelHierarchy"
    );
    const data = await productLevelHierarchyData.get();
    productLevelArray = [];
    if (data.empty) {
      console.log("No productLevelHierarchy records found");
    } else {
      data.forEach(async (doc) => {
        try {
          let productLevel01 = "";
          let productLevel02 = "";
          let productLevel03 = "";

          console.log("productLevelHierarchy - " + doc.id);

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
          // const productLevelHierarchy = new ProductLevelHierarchy(
          //   doc.id,
          //   productLevel01,
          //   productLevel02,
          //   productLevel03,
          //   doc.data().productLevels
          // );
          // const productLevel = newProductLevel(
          //   doc.id,
          //   productLevel01,
          //   productLevel02,
          //   productLevel03,
          //   doc.data().productLevels
          // );
          productLevelArray.push(
            newProductLevel(
              doc.id,
              productLevel01,
              productLevel02,
              productLevel03,
              doc.data().productLevels
            )
          );
          // console.log(productLevel);
          // console.log(productLevelArray);
          // productLevelArray.push(doc.id);
          // console.log(productLevelArray);
        } catch (error) {
          console.log("productLevelHierarchy-1-" + error.message);
        }
        //console.log(productLevelArray);
      });
      // console.log(productLevelArray);
    }
  } catch (error) {
    console.log("productLevelHierarchy-2" + error.message);
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
const newProductLevel = (
  productLevelId,
  productLevel01,
  productLevel02,
  productLevel03,
  productLevels
) => {
  return new ProductLevelHierarchy(
    productLevelId,
    productLevel01,
    productLevel02,
    productLevel03,
    productLevels
  );
};
module.exports = {
  loadProductLevelHierarchy,
  loadProductLevelHierarchy2
};
