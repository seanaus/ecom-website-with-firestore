// 'cartItem' needs to be global as needs to be accessed from addToCart
// However this file will be imported by the shopping cart EJS view also
// Therefore as the product info will only be available from the addToCart functionality
// It will not be set (causing an error) via the cart.ejs view.
// Therefore variable is global but functionality to populate it is only called from AddToCart
let cartItem = {};
// let basket = {};

// const doc = document.getElementById("cart");
// window.onload = () => {
//   doc.addEventListener("onload", getCart);
//   basket = getCart();
//   console.log(basket);
// };

const loadProduct = () => {
  const product = JSON.parse(localStorage.getItem("product"));
  cartItem = {
    id: product.id,
    name: product.name,
    imageURL: product.imageURL,
    unitCost: product.unitCost,
    quantity: 1,
    cost: product.unitCost,
    formattedCost: String(product.unitCost),
  };
  //localStorage.removeItem("product");
};
const initCart = () => {
  const cart = {
    items: [],
    itemCount: 0,
    totalCost: 0,
  };
  saveToCart(cart);
  return cart;
};
const getCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = initCart();
  }
  return cart;
};
const saveToCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const indexById = (items, id) => {
  let idx = -1;
  // let isNew = true;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      idx = i;
      break;
    }
  }
  return idx;
};
const addToCart = () => {
  loadProduct();
  let cart = getCart();
  // const idx = indexById(cart.items, _id);
  const idx = indexById(cart.items, cartItem.id);

  if (idx < 0) {
    cart.items.push(cartItem);
  } else {
    editQuantity(cart.items[idx], "+");
  }
  cart.totalCost = calcTotalCost(cart.items);
  cart.itemCount = calcItemCount(cart.items);
  saveToCart(cart);
  console.log(getCart());
};
const deleteFromCart = (id) => {
  let cart = getCart();
  const idx = indexById(cart.items, id);
  if (idx >= 0) {
    cart.items.splice(idx, 1);
    cart.totalCost = calcTotalCost(cart.items);
    cart.itemCount = calcItemCount(cart.items);
    saveToCart(cart);
  }
};
const editQuantity = (item, option) => {
  if (option === "+") {
    item.quantity++;
    item.cost += item.unitCost;
    item.formattedCost = item.cost;
  }
  if (option === "-") {
    if (item.quantity > 1) {
      item.quantity--;
      item.cost -= item.unitCost;
      item.formattedCost = item.cost;
    }
  }
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
