"use strict";
const firebase = require("../db");
const ProductLevel01 = require("../models/productLevel01");
const firestore = firebase.firestore();

const loadProductLevel01 = async (id) => {
  try {
    if (typeof (id) != "undefined") {
      const productLevelData = await firestore.collection("productLevel01").doc(id);
      const data = await productLevelData.get();
      if (!data.empty) {
        const productLevel01 = new ProductLevel01(
          data.id,
          data.data().label
        );
        return productLevel01
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
  loadProductLevel01
};


// "use strict";
// const firebase = require("../db");
// const ProductLevel01 = require("../models/productLevel01");
// const firestore = firebase.firestore();

// const loadProductLevel01 = async (id) => {
//   try {
//     if (id === "UNDEFINED") {
//         const productLevel01 = new ProductLevel01(
//         "",
//         ""
//         );
//         return productLevel01
//     } else {
//         const productLevelData = await firestore.collection("productLevel01").doc(id);
//         const data = await productLevelData.get();
//         const productLevel01 = new ProductLevel01(
//         data.id,
//         data.data().label
//         );
//         return productLevel01
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// module.exports = {
//   loadProductLevel01
// };
