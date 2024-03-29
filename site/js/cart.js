import { auth } from "./auth.js";
import { getSettings, projectName, profitMetricPercentage } from "./settings.js";
import { getProduct, asGBP } from "./product.js";
const cartCardTemplate = `
  <div class="cartCard">
        <div id="cartCardId" style="display: none;">
          {item.id}
        </div>
        <div id="cartCardName" class="cartCardName">
          {item.name}
        </div>
        <div id="cartCardImage" class="cartCardImage" style="background-image: url('{item.imageCard}')"></div>
		<div class="cartCardQuantityContainer">
			<button id="cartCardQuantityBtnRemove" 
                class="cartCardQuantityBtn 
                cartCardQuantityBtnRemove 
                material-icons"
                data-idx="{idx}"
                >remove
        </button>
   			<div id="cartCardQuantity" class="cartCardQuantity" data-idx="{idx}">{item.quantity}</div>
    		<button id="cartCardQuantityBtnAdd" 
                    class="cartCardQuantityBtn 
                    cartCardQuantityBtnAdd
                    material-icons"
                    data-idx="{idx}"
                    >add
        </button>
		</div>
        <div id="formattedCost" 
            class="cartCardCost"
            data-idx="{idx}"
        >
          {item.formattedCost}
        </div>
          <button id="cartCardDelete" class="material-icons cartCardDelete" data-idx="{idx}">delete</button>
      </div >
`;
const cartTotalsTemplate = `
<div class="cartTotalCell cartTotalCellLabel">Items</div>
<div class="cartTotalCell cartTotalCellValue">{items}</div>
<div class="cartTotalCell cartTotalCellLabel">Net</div>  
<div class="cartTotalCell cartTotalCellValue">{netTotal}</div>
<div class="cartTotalCell cartTotalCellLabel">Vat</div>
<div class="cartTotalCell cartTotalCellValue">{profitMetricPercentage}</div>
<div class="cartTotalCell cartTotalCellLabel">Total</div>
<div class="cartTotalCell cartTotalCellValue">{total}</div>
<form action="/checkout" class="cartTotalBtn">
  <button id="checkout" class="cartBtn" type="/submit">Checkout</button>
</form>
`;
const cartCardTemplateEmpty = `
  <div class="cartCardEmpty">
    <div>Your Shopping Cart Is Empty!</div>
    <div class="material-icons">sentiment_very_dissatisfied</div>
  </div>
`;
const btnAddToCart = document.getElementById("addToCart");
const cartCardQuantity = document.getElementById("cartCardQuantity");
// const settings = getSettings();

window.onload = () => {
  if (btnAddToCart) {
    btnAddToCart.addEventListener("click", addToCart);
  }
  renderCart();
};
const renderCart = () => {
  const cartContainerElement = document.getElementById("cartContainer");
  const cartElement = document.getElementById("cart");
  if (cartElement) {
    let cart = getCart();
    let cartViewHTML = "";
    let idx = 0;
    const dataIdx = new RegExp("{idx}", "g");
    if (cart.itemCount > 0) {
      cart.items.forEach((item) => {
        let cardViewHTML = cartCardTemplate;
        cardViewHTML = cardViewHTML.replace("{item.id}", item.id);
        cardViewHTML = cardViewHTML.replace("{item.name}", item.name);
        cardViewHTML = cardViewHTML.replace("{item.imageCard}", item.imageCard);
        cardViewHTML = cardViewHTML.replace("{item.quantity}", item.quantity);
        cardViewHTML = cardViewHTML.replace(
          "{item.formattedCost}",
          item.formattedCost
        );
        cardViewHTML = cardViewHTML.replace(dataIdx, idx);
        cartViewHTML += cardViewHTML;
        idx++;
      });
    } else {
      cartViewHTML = cartCardTemplateEmpty;
      addClass(cartContainerElement, "cartContainerEmpty");
      removeClass(cartElement, "cartCardContainerAlignCenter");
    }
    // Render all Cards
    cartElement.innerHTML = cartViewHTML;
    // Populate Cart Totals
    renderCartTotals(cart);
    attachEventListeners();
    refreshCartIcon();
  }
};
const renderCartTotals = (cart) => {
  const cartTotalsContainerElement = document.getElementById("cartTotals");
  let cartTotalsViewHTML = cartTotalsTemplate;
  let _profitMetricPercentage = 0;
  _profitMetricPercentage= calcprofitMetricPercentage(cart.totalCost, profitMetricPercentage());
  cartTotalsViewHTML = cartTotalsViewHTML.replace("{items}", cart.itemCount);
  cartTotalsViewHTML = cartTotalsViewHTML.replace(
    "{netTotal}",
    asGBP.format(cart.totalCost)
  );
  cartTotalsViewHTML = cartTotalsViewHTML.replace(
    "{profitMetricPercentage}",
    asGBP.format(_profitMetricPercentage)
  );
  cartTotalsViewHTML = cartTotalsViewHTML.replace(
    "{total}",
    asGBP.format(cart.totalCost + _profitMetricPercentage)
  );
  cartTotalsContainerElement.innerHTML = cartTotalsViewHTML;
};
const attachEventListeners = () => {
  const btns = document.querySelectorAll("button");
  btns.forEach((btn) => {
    if (btn.id === "cartCardQuantityBtnAdd") {
      btn.addEventListener("click", editCardQuantity);
    }
    if (btn.id === "cartCardQuantityBtnRemove") {
      btn.addEventListener("click", editCardQuantity);
    }
    if (btn.id === "cartCardDelete") {
      btn.addEventListener("click", deleteCardItem);
    }
  });
};
const saveToCart = (cart) => {
  calcCartTotals(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  refreshCartIcon();
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
const initCart = () => {
  const user = auth();
  const cart = {
    userId: user.id,
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
const addToCart = () => {
  let cart = getCart();
  const cartItem = getProduct();
  const idx = indexById(cart.items, cartItem.id);

  if (idx < 0) {
    cart.items.push(cartItem);
    saveToCart(cart);
  } else {
    editCartQuantity(cart, idx, "+");
  }
  window.location.href = "../products";
};
const deleteCardItem = (event) => {
  const btn = event.target;
  const idx = parseInt(btn.getAttribute("data-idx"));
  let cart = getCart();
  if (idx >= 0) {
    cart.items.splice(idx, 1);
    saveToCart(cart);
    renderCart();
  }
};
const editCardQuantity = (event) => {
  let option = "";
  const btn = event.target;
  const cart = getCart();
  const idx = parseInt(btn.getAttribute("data-idx"));
  if (btn.getAttribute("id") === "cartCardQuantityBtnAdd") {
    option = "+";
  }
  if (btn.getAttribute("id") === "cartCardQuantityBtnRemove") {
    option = "-";
  }
  editCartQuantity(cart, idx, option);
  refreshCardCartGUI(cart, idx);
  renderCartTotals(cart);
};
const refreshCardCartGUI = (cart, idx) => {
  const quantityValue = document.querySelector(
    `[id='cartCardQuantity'][data-idx="${idx}"]`
  );
  const formattedCostValue = document.querySelector(
    `[id='formattedCost'][data-idx="${idx}"]`
  );
  if (quantityValue) quantityValue.innerText = cart.items[idx].quantity;
  if (formattedCostValue)
    formattedCostValue.innerText = cart.items[idx].formattedCost;
};
const editCartQuantity = (cart, idx, option) => {
  if (cart.items[idx] && option === "+") {
    cart.items[idx].quantity++;
    cart.items[idx].cost += cart.items[idx].unitCost;
    cart.items[idx].formattedCost = asGBP.format(cart.items[idx].cost);
    saveToCart(cart);
  }
  if (cart.items[idx] && option === "-") {
    if (cart.items[idx].quantity > 1) {
      cart.items[idx].quantity--;
      cart.items[idx].cost -= cart.items[idx].unitCost;
      cart.items[idx].formattedCost = asGBP.format(cart.items[idx].cost);
      saveToCart(cart);
    }
  }
};
const calcCartTotals = (cart) => {
  cart.totalCost = calcTotalCost(cart.items);
  cart.itemCount = calcItemCount(cart.items);
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
const calcprofitMetricPercentage = (value, percentage) => {
  return Math.ceil(value * (percentage / 100));
};
const addClass = (element, className) => {
  if (element) {
    element.classList.add(className);
  }
};
const removeClass = (element, className) => {
  if (element) {
    element.classList.remove(className);
  }
};
const refreshCartIcon = () => {
  const cart = getCart();
  const cartCounterElement = document.getElementById("cartCounter");
  if(cartCounterElement) {
    cartCounterElement.innerText = JSON.parse(cart.itemCount);
  }
};
export { getCart };
