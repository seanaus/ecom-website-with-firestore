"use strict";
const firebase = require("../db");
const Product = require("../models/product");
const ProductGroup = require("../models/productGroup");
const firestore = firebase.firestore();
// let productArray = [];
// let productGroupArray = [];
let productsArray = [];
const loadProductGroups = async () => {
  let productGroupArray = [];
  try {
    const productGroup = await firestore.collection("productGroup");
    const data = await productGroup.get();

    if (data.empty) {
      console.log("No Product Group records found");
    } else {
      data.forEach((doc) => {
        const productGroup = new ProductGroup(
          doc.id,
          doc.data().productLevel01Id,
          doc.data().productLevel02Id,
          doc.data().productLevel03Id,
          doc.data().productId
        );
        productGroupArray.push(productGroup);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
  return productGroupArray;
};
const loadProducts = async () => { 
  let productArray = [];
  try {
    // Get Product Collection
    const products = await firestore.collection("products");
    const data = await products.get();
    const BLANK = "-1";

    if (data.empty) {
      console.log("No product records found");
    } else {
      data.forEach((doc) => {
          const product = new Product(
            doc.id,
            BLANK,
            BLANK,
            BLANK,
            doc.data().name,
            doc.data().description,
            doc.data().imageCard,
            doc.data().image,
            doc.data().unitCost,
            asGBP.format(parseFloat(doc.data().unitCost))
          );
          productArray.push(product);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
  return productArray;
}

const loadProductData = async () => {
  productsArray = [];
  try {
    const productGroupArrayRaw = await loadProductGroups();
    const productArrayRaw = await loadProducts();
    productGroupArrayRaw.forEach((productGroup) => {
      const idx = matchProduct(productArrayRaw, productGroup.productId);
      if (idx >= 0) {
        const product = new Product(
          productArrayRaw[idx].id,
          productGroup.productLevel01Id,
          productGroup.productLevel02Id,
          productGroup.productLevel03Id,
          productArrayRaw[idx].name,
          productArrayRaw[idx].description,
          productArrayRaw[idx].imageCard,
          productArrayRaw[idx].image,
          productArrayRaw[idx].unitCost,
          productArrayRaw[idx].formattedCost
        )
        productsArray.push(product);
      }
      // const matchedProductGroup = productGroupArray.filter(productGroup => productGroup.productId == doc.id);
    });
  } catch (error) {
    console.log(error.message);
  }
  return productsArray;
};
const getProducts = () => {
  if (productsArray) {
    return productsArray;
  } else {
    return false;
  }
};
const findProduct = (id) => {
  let idx = -1;
  if (productsArray) {
    for (let i = 0; i < productsArray.length; i++) {
      if (productsArray[i].id === id) {
        idx = i;
        break;
      }
    }
    if (idx >= 0) {
      return new Product(
        productsArray[idx].id,
        productsArray[idx].productLevel01Id,
        productsArray[idx].productLevel02Id,
        productsArray[idx].productLevel03Id,
        productsArray[idx].name,
        productsArray[idx].description,
        productsArray[idx].imageCard,
        productsArray[idx].image,
        productsArray[idx].unitCost,
        productsArray[idx].formattedCost,
      );
    } else {
      return false;
    }
  } else {
    return false;
  }

/*   const product = filterProducts(productsArray, id);
  const product = productsArray.filter(searchProduct => searchProduct.id == id);
  console.log(productsArray.length);
  if (product) {
    return product
  } else {
    return false
  }
  return product */
  
  
};
const filterProducts = (sourceArray, id) => {
  // console.log("filterProductGroup");
  // console.log(`arr ${sourceArray.productId}`);
  // console.log(`productId ${productId}`);
  // console.log(sourceArray.filter(productGroup => productGroup.productId == productId));
//  console.log(`PID : ${sourceArray.filter(productGroup => productGroup.productId == productId).map(product => { return product })}`)
  // return sourceArray.filter(productGroup => productGroup.productId == productId).map(product => { return product.productId });
  return sourceArray.filter(searchProduct => searchProduct.id === id);
  // if (paramArray[0] == "*") {
  //   return sourceArray.map(product => { return product.productId });
  // } else {
  //   switch(paramArray.length) {
  //     case 1:
  //       return sourceArray.filter(productGroup => productGroup.productLevel01Id == paramArray[0]).map(product => { return product.productId });
  //     case 2:
  //       return sourceArray.filter(productGroup => productGroup.productLevel01Id == paramArray[0] && productGroup.productLevel02Id == paramArray[1]).map(product => { return product.productId });
  //     case 3:
  //       return sourceArray.filter(productGroup => productGroup.productLevel01Id == paramArray[0] && productGroup.productLevel02Id == paramArray[1] && productGroup.productLevel03Id == paramArray[2]).map(product => { return product.productId })
  //   }
  // }
}

// const matchProductGroup = async(sourceArray, productId) => {
//   try {
//     let idx = 0;
//     sourceArray.forEach(async(productGroup) => {
//       // console.log(`MATCH: ${productGroup.productId} TO: ${productId}`)
//       if (productGroup.productId == productId) {
//         // console.log(`MATCH: ${productGroup.productId} TO: ${productId}`)
//         // console.log(idx);
//         return idx;
//       }
//       idx++;
//     });
//   } catch {
//     console.log(error.message);
//   }
// }
const matchProduct = (sourceArray,id) => {
  let idx = -1;
  for (let i = 0; i < sourceArray.length; i++) {
    if (sourceArray[i].id === id) {
      idx = i;
      break;
    }
  }
  return idx;
}
// Sean Austin
// 13/01/2022
// Format numbers to currency in GBP
const asGBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
module.exports = {
  getProducts,
  findProduct,
  loadProductData,
  asGBP
};
