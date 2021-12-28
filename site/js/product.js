const _id = document.getElementById("id").innerHTML;
const _name = document.getElementById("name").innerHTML;
const _imageURL = document.getElementById("imageURL").innerHTML;
const _description = document.getElementById("description").innerHTML;
const _unitCost = parseFloat(document.getElementById("unitCost").innerHTML);
// const btnAddToCart = document.getElementById("addToCart");

let _product = {
  id: _id,
  name: _name,
  imageURL: _imageURL,
  unitCost: _unitCost 
}
//localStorage.setItem("product", JSON.stringify(_product));
const getProduct = () => {
  // const product = JSON.parse(localStorage.getItem("product"));
  cartItem = {
    id: _product.id,
    name: _product.name,
    imageURL: _product.imageURL,
    unitCost: _product.unitCost,
    quantity: 1,
    cost: _product.unitCost,
    formattedCost: String(_product.unitCost),
  };
  //localStorage.removeItem("product");
  return cartItem
};
// let item = {
//   id: _id,
//   name: _name,
//   imageURL: _imageURL,
//   unitCost: _unitCost,
//   quantity: 1,
//   cost: _unitCost,
//   formattedCost: _unitCost,
// };

// const formatMoney =(amount, decimalCount = 2, decimal = ".", thousands = ",")=> {
//   try {
//     decimalCount = Math.abs(decimalCount);
//     decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

//     const negativeSign = amount < 0 ? "-" : "";

//     let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
//     let j = (i.length > 3) ? i.length % 3 : 0;

//     return
//     negativeSign +
//       (j ? i.substr(0, j) + thousands : '') +
//       i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
//       (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
//   } catch (e) {
//     console.log(e)
//   }
// };

window.onload = () => {
  // btnAddToCart.addEventListener("click", addToCart);
};

// const initCart = () => {
//   const cart = {
//     items: [],
//     itemCount: 0,
//     totalCost: 0,
//   };
//   localStorage.setItem("cart", JSON.stringify(cart));
//   return cart;
// };
// const getCart = () => {
//   let cart = JSON.parse(localStorage.getItem("cart"));
//   if (!cart) {
//     cart = initCart();
//   }
//   return cart;
// };
// const newItem = (items, id) => {
//   let idx = -1;
//   // let isNew = true;
//   for (let i = 0; i < items.length; i++) {
//     if (items[i].id === id) {
//       idx = i;
//       break;
//     }
//   }
//   return idx;
// };
// const addToCart = () => {

//   let cart = getCart();
//   const idx = newItem(cart.items, _id);

//   if (idx < 0) {
//     cart.items.push(item);
//   } else {
//     cart.items[idx].quantity++;
//     cart.items[idx].cost += cart.items[idx].unitCost;
//     cart.items[idx].formattedCost = cart.items[idx].cost;
//   }

//   // localStorage.removeItem("cart");
//   localStorage.setItem("cart", JSON.stringify(cart));
//   console.log(getCart());
// };


