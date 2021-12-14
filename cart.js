"use strict";
const firebase = require("./db");
const firestore = firebase.firestore();
const CartItem = require("./models/cartItem");
const { getProducts } = require("./core/product");

let items = [];
let totalCost = 0;
let itemCount = 0;
let created = null;
let modified = null;

const initDateTime = () => {
  created = dateTime();
  modified = dateTime();
};
const clearCart = () => {
  items.splice(0, items.length);
  totalCost = 0;
  itemCount = 0;
  initDateTime();
};

const addToCart = async (id) => {
  try {
    if (!itemCount) {
      clearCart();
    }
    //Is the Product already in the cart
    const idx = indexById(items, id);
    if (idx >= 0) {
      items[idx].quantity++;
      items[idx].cost = items[idx].unitCost * items[idx].quantity;
    } else {
      const products = getProducts();
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          const item = new CartItem(products[i]);
          item.formattedCost = formatGBP(item.cost);
          items.push(item);
        }
      }
    }
    totalCost = calcTotalCost(items);
    itemCount = calcItemCount(items);
  } catch (error) {
    console.log(error.message);
  }
};
const deleteFromCart = (id) => {
  const idx = indexById(items, id);
  if (idx >= 0) {
    items.splice(idx, 1);
  }
  totalCost = calcTotalCost(items);
  itemCount = calcItemCount(items);
};
const increaseQuantity = (id) => {
  const idx = indexById(items, id);
  if (idx >= 0) {
    items[idx].quantity++;
    items[idx].cost = items[idx].unitCost * items[idx].quantity;
    items[idx].formattedCost = formatGBP(items[idx].cost);
    totalCost = calcTotalCost(items);
    itemCount = calcItemCount(items);
  }
};
const reduceQuantity = (id) => {
  const idx = indexById(items, id);
  if (idx >= 0 && items[idx].quantity > 1) {
    items[idx].quantity--;
    items[idx].cost = items[idx].unitCost * items[idx].quantity;
    items[idx].formattedCost = formatGBP(items[idx].cost);
    totalCost = calcTotalCost(items);
    itemCount = calcItemCount(items);
  }
};
const getCart = () => {
  return {
    items,
    totalCost,
    itemCount,
    created,
    modified,
  };
};
const formatGBP = (value) => {
  return pounds.format(value);
};
const pounds = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  //maximumFractionDigits: 0
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //, // (causes 2500.99 to be printed as $2,501)
});
const dateTime = (option) => {
  const datePart = 0;
  const timePart = 1;
  const systemDateTime = new Date().toLocaleString("en-GB", {
    timeZone: "UTC",
  });
  const dateTime = systemDateTime.split(",");

  if (option === "date") {
    return dateTime[datePart].trim();
  } else if (option === "time") {
    return dateTime[timePart].trim();
  } else {
    return dateTime[datePart] + " " + dateTime[timePart].trim();
  }
};
const indexById = (items, id) => {
  let idx = -1;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      idx = i;
      break;
    }
  }
  return idx;
};
const calcTotalCost = (items) => {
  let totalCost = 0;

  for (let i = 0; i < items.length; i++) {
    totalCost += parseFloat(items[i].cost);
  }
  return formatGBP(totalCost);
};
const calcItemCount = (items) => {
  if (items) {
    return items.length;
  } else {
    return 0;
  }
};

const saveCart = async (req, res, next) => {
  try {
    const jsonItems = items.map((obj) => { return Object.assign({}, obj) });
    const cart = {
      items: jsonItems,
      totalCost,
      itemCount,
      created,
      modified
    };

    await firestore.collection("cart").doc().set(cart);
    console.log("Record saved successfuly");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  clearCart,
  getCart,
  addToCart,
  deleteFromCart,
  increaseQuantity,
  reduceQuantity,
  formatGBP,
  saveCart
};
