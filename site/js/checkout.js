import { getCart } from "./cart.js";

window.onload = () => {
  const formCheckout = document.getElementById("checkout");
  const btnCheckout = document.getElementById("confirmPayment");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", checkout);
  }
};
const checkout = () => {
  try {
    let cart = getCart();
    const form = document.getElementById("checkout");
    if (form) {
      for (let field of form.elements) {
        if (field.name) {
          cart[field.name] = field.value;
        }
      }
      postData("saveCart", cart, "cart");

      //   cart.checkout=jsonObject
      localStorage.removeItem("cart");
    } else {
      console.log(form);
    }
  } catch (error) {
    console.log(error.message);
  }
};
const postData = (route, data, alias = "data") => {
  try {
    const req = new XMLHttpRequest();
    // json = `${alias}: ${data}`;
    route = route[0] === "/" ? route : "/" + route;
    req.open("POST", route, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(
      JSON.stringify({
        cart: data,
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};
