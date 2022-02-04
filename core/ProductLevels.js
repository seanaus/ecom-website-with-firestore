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
    productLevelArray = [];

    const productLevel01Array = await loadProductLevel01();
    const productLevel02Array= await loadProductLevel02();
    const productLevel03Array = await loadProductLevel03();
    
    const productLevelsData = await firestore.collection("productLevelHierarchy");
    const data = await productLevelsData.get();

    if (!data.empty) {
      data.forEach(doc => {
        // console.log(doc.id);
        let productLevel01 = "undefined";
        let productLevel02 = "undefined";
        let productLevel03 = "undefined";

        let productLevel01Id = typeof doc.data().productLevel01 != "undefined" ? doc.data().productLevel01 : "-1";
        let productLevel02Id = typeof doc.data().productLevel02 != "undefined" ? doc.data().productLevel02 : "-1";
        let productLevel03Id = typeof doc.data().productLevel03 != "undefined" ? doc.data().productLevel03 : "-1";

        if (productLevel01Id !== "-1") {
          productLevel01 = productLevel01Array[findProductLevel(productLevel01Array, productLevel01Id)];
        }
        if (productLevel02Id !== "-1") {
          productLevel02 = productLevel02Array[findProductLevel(productLevel02Array, productLevel02Id)];
        }
        if (productLevel03Id !== "-1") {
          productLevel03 = productLevel03Array[findProductLevel(productLevel03Array, productLevel03Id)];
        }
        const productLevels = new ProductLevels(
          doc.id,
          productLevel01,
          productLevel02,
          productLevel03,
          doc.data().productLevels
        )
        productLevelArray.push(productLevels);
      });
      return productLevelArray
    } else {
      console.log("No productLevels records found");
    }
    
  } catch (error) {
    console.log(`productLevels :  ${error.message}`);
  }
}

const findProductLevel = (productLevel, id) => {
  for (let i= 0; i < productLevel.length; i++) {
    if (productLevel[i].id === id) {
      return i
    }
  }
}

// const findProductLevel = (productLevel,id) => {
//   productLevel.forEach((item) => {
//     if (item.id === id) {
//       console.log("findProductLevel01 " + JSON.stringify(item));
//       return item
//     } 
//   })
// }
// const findProductLevel02 = (productLevel02,id) => {
//   if (typeof productLevel02) {
//     productLevel02.forEach((rec) => {
//       if (rec.id === id) {
//         return rec
//       } 
//     })
//   } else {
//     console.log("No productLevel02 records available");
//   }
// }
// const findProductLevel03 = (productLevel03,id) => {
//   if (typeof productLevel03) {
//     productLevel03.forEach((rec) => {
//       if (rec.id === id) {
//         return rec
//       } 
//     })
//   } else {
//     console.log("No productLevel03 records available");
//   }
// }
module.exports = {
  loadProductLevels
};
