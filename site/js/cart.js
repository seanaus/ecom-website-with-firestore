const cartCardTemplate = `
  <div class="cartCard">
        <div id="cartCardId" style="display: none;">
          <%= item.id %>
        </div>
        <div id="cartCardName" class="cartCardName">
          <%= item.name %>
        </div>
        <div id="cartCardImage" class="cartCardImage" style="background-image: url('<%= item.imageCard %>')"></div>
		<div class="cartCardQuantityContainer">
			<button id="cartCardQuantityBtnRemove" 
                class="cartCardQuantityBtn 
                cartCardQuantityBtnRemove 
                material-icons"
                data-idx="<%= idx %>"
                >remove
        </button>
   			<div id="cartCardQuantity" class="cartCardQuantity" data-idx="<%= idx %>"><%= item.quantity %></div>
    		<button id="cartCardQuantityBtnAdd" 
                    class="cartCardQuantityBtn 
                    cartCardQuantityBtnAdd
                    material-icons"
                    data-idx="<%= idx %>"
                    >add
        </button>
		</div>
        <div id="formattedCost" 
            class="cartCardCost"
            data-idx="<%= idx %>"
        >
          <%= item.formattedCost %>
        </div>
          <button id="cartCardDelete" class="material-icons cartCardDelete" data-idx="<%= idx %>">delete</button>
      </div >
`;

const btnAddToCart = document.getElementById("addToCart");
const cartCardQuantity = document.getElementById("cartCardQuantity");

// window.onload = () => {
if (btnAddToCart) {
  btnAddToCart.addEventListener("click", addToCart);
  renderCart();
}
const renderCart = () => {
  const cartContainer = document.getElementById("cart");
  if (cartContainer) {
    let cart = getCart();
    let cartViewHTML = "";
    // let cartItem = {};
    let idx = 0;
    const dataIdx = new RegExp("<%= idx %>", "g");
    cart.items.forEach((item) => {
      let cardViewHTML = cartCardTemplate;
      cardViewHTML = cardViewHTML.replace("<%= item.id %>", item.id);
      cardViewHTML = cardViewHTML.replace("<%= item.name %>", item.name);
      cardViewHTML = cardViewHTML.replace(
        "<%= item.imageCard %>",
        item.imageURL
      );
      cardViewHTML = cardViewHTML.replace(
        "<%= item.quantity %>",
        item.quantity
      );
      cardViewHTML = cardViewHTML.replace(
        "<%= item.formattedCost %>",
        item.formattedCost
      );
      cardViewHTML = cardViewHTML.replace(dataIdx, idx);
      cartViewHTML += cardViewHTML;
      idx++;
    });
    cartContainer.innerHTML = cartViewHTML;
  }
  attachEventListeners();
  refreshCartIcon();
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
    cart.items[idx].formattedCost = cart.items[idx].cost;
    saveToCart(cart);
  }
  if (cart.items[idx] && option === "-") {
    if (cart.items[idx].quantity > 1) {
      cart.items[idx].quantity--;
      cart.items[idx].cost -= cart.items[idx].unitCost;
      cart.items[idx].formattedCost = cart.items[idx].cost;
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
const refreshCartIcon = () => {
  const cart = getCart();
  document.getElementById("cartCounter").innerText = JSON.parse(cart.itemCount);
};
