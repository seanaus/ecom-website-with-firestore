"use strict";
const firebase = require("../db");
// const ProductLevel01 = require("../models/productLevel01");
// const ProductLevel02 = require("../models/productLevel02");
// const ProductLevel03 = require("../models/productLevel03");
const ProductLevelHierarchy = require("../models/productLevelHierarchy");
const { loadProductLevel01 } = require("../core/productLevel01");
const { loadProductLevel02 } = require("../core/productLevel02");
const { loadProductLevel03 } = require("../core/productLevel03");

const firestore = firebase.firestore();
let productLevelHierarchyArray = [];

const loadProductLevelHierarchy = async () => {
  try {
    // productLevelHierarchyArray = [];

    // const productLevelHierarchyData = await firestore.collection("productLevelHierarchy").orderBy('__name__');
    const productLevelHierarchyData = await firestore.collection("productLevelHierarchy");
    const data = await productLevelHierarchyData.get();

    if (data.empty) {
      console.log("No productLevelHierarchy records found");
    } else {
      data.forEach(async (doc) => {

        let productLevel01Id = (typeof (doc.data().productLevel01) != "undefined") ? doc.data().productLevel01 : "-1";
        let productLevel02Id = (typeof (doc.data().productLevel02) != "undefined") ? doc.data().productLevel02 : "-1";
        let productLevel03Id = (typeof (doc.data().productLevel03) != "undefined") ? doc.data().productLevel03 : "-1";
      
        let productLevel01Info = "{id:'',label:''}";
        let productLevel02Info = "{id:'',label:''}";
        let productLevel03Info = "{id:'',label:''}";

        if (productLevel01Id !== "-1") {
          productLevel01Info = await loadProductLevel01(doc.data().productLevel01);
          // console.log(productLevel01Id);
        }
        if (productLevel02Id !== "-1") {
          productLevel02Info = await loadProductLevel02(doc.data().productLevel02);
          //console.log(productLevel02Id);
        }
        if (productLevel03Id !== "-1") {
          productLevel03Info = await loadProductLevel03(doc.data().productLevel03);
          //console.log(productLevel03Id);
        }
        const productLevelHierarchy = new ProductLevelHierarchy(
          doc.id,
          productLevel01Info,
          productLevel02Info,
          productLevel03Info,
          doc.data().productLevels
        );
        productLevelHierarchyArray.push(productLevelHierarchy);
        // console.log(productLevelHierarchy);
        // if (doc.data().productLevel02) { 
        //   productLevel02Info = await loadProductLevel02(doc.data().productLevel02);
        // }
        // if (doc.data().productLevel03) {
        //   productLevel03Info = await loadProductLevel03(doc.data().productLevel03);
        // }

          // const productLevelHierarchy = new ProductLevelHierarchy(
          //   doc.id,
          //   productLevel01Info,
          //   productLevel02Info,
          //   productLevel03Info,
          //   doc.data().productLevels
          // );
          // console.log(productLevelHierarchy);
          // productLevelHierarchyArray.push(productLevelHierarchy);
          // console.log(productLevelHierarchyArray);
      });
      // console.log(productLevelHierarchyArray[0]);
    }
  } catch (error) {
    console.log(error.message);
  }
  if (productLevelHierarchyArray.length) {
    console.log("LMFAO");
    console.log(productLevelHierarchyArray.length);
    return productLevelHierarchyArray;
  } else {
    return false;
  }
};
module.exports = {
  loadProductLevelHierarchy
};
