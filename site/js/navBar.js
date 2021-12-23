let _cartItemCount = 0;
const gridView = window.matchMedia("(min-width: 768px)");
//Toggle navPill visibillity on smaller devices
const toggleNavPills = () => {
  const navBar = document.getElementById("navBar");
  navBar.style.display = navBar.style.display === "none" ? "flex" : "none";
};
const isSelected = () => {
  const currentPageUrl = location.href;
  const menuItem = document.querySelectorAll("a");
  for (let i = 0; i < menuItem.length; i++) {
    if (menuItem[i].href === currentPageUrl) {
      if ((menuItem[i].className = "navPill navLink")) {
        menuItem[i].className += " active";
      }
    }
  }
};
// Hide pills on smaller divices
const configureNavBar = () => {
  const navBar = document.getElementById("navBar");
  navBar.style.display = gridView.matches ? "flex" : "none";
};

window.onload = () => {
  isSelected();
  _cartItemCount = cartItemCount();
  const cartCounter = document.getElementById("cartCounter");
  cartCounter.innerText = _cartItemCount;
};
const cartItemCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    console.log(`Count: ${cart.itemCount}`)
    return cart.itemCount;
  } else {
    return 0;
  }
};
