"use strict";
const firebase = require("../db");
const ProductLevel02 = require("../models/productLevel02");
const firestore = firebase.firestore();

const loadProductLevel02 = async (id) => {
  try {
    if (typeof (id) != "undefined") {
      const productLevelData = await firestore.collection("productLevel02").doc(id);
      const data = await productLevelData.get();
      if (!data.empty) {
        const productLevel02 = new ProductLevel02(
          data.id,
          data.data().label
        );
        return productLevel02
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
  loadProductLevel02
};


// "use strict";
// const firebase = require("../db");
// const ProductLevel02 = require("../models/productLevel02");
// const firestore = firebase.firestore();

// const loadProductLevel02 = async (id) => {
//   try {
//     if (id === "UNDEFINED") {
//         const productLevel02 = new ProductLevel02(
//           "",
//           ""
//         );
//         return productLevel02
//     } else {
//         const productLevelData = await firestore.collection("productLevel02").doc(id);
//         const data = await productLevelData.get();
//         const productLevel02 = new ProductLevel02(
//           data.id,
//           data.data().label
//         );
//         return productLevel02
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// module.exports = {
//   loadProductLevel02
// };
