const CartItem = require("../models/cartItem");

//const items = [];
class Cart {
  constructor() {
    this.items = [];
    this.totalCost = 0;
    this.itemCount = 0;
    this.created = dateTime();
    this.modified = dateTime();
  }
  addItem = (id) => {
    //Is the Product already in the cart
    const idx = indexById(this.items, id);
    if (idx >= 0) {
      this.items[idx].quantity++;
      this.items[idx].cost =
        this.items[idx].unitCost * this.items[idx].quantity;
    } else {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          const item = new CartItem(products[i]);
          this.items.push(item);
        }
      }
    }
    this.totalCost = calcTotalCost(this.items);
    this.itemCount = calcItemCount(this.items);
  };
  deleteItem = (id) => {
    const idx = indexById(this.items, id);
    if (idx >= 0) {
      this.items.splice(idx, 1);
    }
    this.totalCost = calcTotalCost(this.items);
    this.itemCount = calcItemCount(this.items);
  };
  increaseQuantity = (id) => {
    const idx = indexById(this.items, id);
    if (idx >= 0) {
      this.items[idx].quantity++;
      this.items[idx].cost =
        this.items[idx].unitCost * this.items[idx].quantity;
      this.totalCost = calcTotalCost(this.items);
      this.itemCount = calcItemCount(this.items);
    }
  };
  reduceQuantity = (id) => {
    const idx = indexById(this.items, id);
    if (idx >= 0 && this.items[idx].quantity > 1) {
      this.items[idx].quantity--;
      this.items[idx].cost =
        this.items[idx].unitCost * this.items[idx].quantity;
      this.totalCost = calcTotalCost(this.items);
      this.itemCount = calcItemCount(this.items);
    }
  };
  formatGBP(value) {
    return pounds.format(value);
  }
}
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
    }
  }
  return idx;
};
const calcTotalCost = (items) => {
  let totalCost = 0;

  for (let i = 0; i < items.length; i++) {
    totalCost += parseFloat(items[i].cost);
  }
  return totalCost;
};
const calcItemCount = (items) => {
  if (items) {
    return items.length;
  } else {
    return 0;
  }
};
module.exports = Cart;
