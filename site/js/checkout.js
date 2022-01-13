import { getCart } from "./cart.js";
let btnCheckout = -1;

window.onload = () => {
  addEventListeners();
};
// Sean Austin
// 13/01/2022
// Bind all relevant EventListeners of views controlls
const addEventListeners = () => {
  btnCheckout = document.getElementById("confirmPayment");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", checkOut);
  }
};
// Sean Austin
// 13/01/2022
// Add additional fields (name, address etc to cart object and save to Firebase)
// As we need to send the cart json data to web server "saveCart route" we need
// to use an XMLHttpRequest object as we cant simply add the data to the body as we
// would with normal form data.
const checkOut = () => {
  try {
    let cart = getCart();
    const fields = document.querySelectorAll("input");
    for (let i = 0; i < fields.length; i++) {
      cart[fields[i].name] = fields[i].value;
    }
    postData("/saveCart", cart, "cart")
      .then(() => {
        localStorage.removeItem("cart");
        window.location.href = "/home";
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error.message);
  }
};
// Sean Austin
// 13/01/2022
// Add additional fields (name, address etc to cart object and save to Firebase)
// Create request object and post it to the node js route
const postData = (route, data, alias = "data") => {
  try {
    const req = new XMLHttpRequest();
    route = route[0] === "/" ? route : "/" + route;
    req.open("POST", route, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(
      JSON.stringify({
        cart: data,
      })
    );
    return new Promise((resolve) => {
      resolve("Save Successful");
    });
  } catch (error) {
    console.log(error.message);
    return new Promise((reject) => {
      reject("save unsuccessful");
    });
  }
};
