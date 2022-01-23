const gridView = window.matchMedia("(min-width: 768px)");
// Sean Austin
// 13/01/2022
// Toggle navPill visibillity on smaller devices
const toggleNavPills = () => {
  const navBar = document.getElementById("navBar");
  navBar.style.display = navBar.style.display === "none" ? "flex" : "none";
};
// Sean Austin
// 13/01/2022
// Highlight selected navPill
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
// Sean Austin
// 13/01/2022
// Hide burger on smaller divices
const configureNavBar = () => {
  const navBar = document.getElementById("navBar");
  navBar.style.display = gridView.matches ? "flex" : "none";
};
// Sean Austin
// 13/01/2022
// ...
window.onload = () => {
  isSelected();
  const items = cartItemCount();
  const cartCounter = document.getElementById("cartCounter");
  if (cartCounter) {
    cartCounter.innerText = items === null ? 0 : items;
  }
};
// Sean Austin
// 13/01/2022
// Get Item Count from BROWSER'S localStorage
const cartItemCount = () => {
  let count = 0;
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    count = cart.itemCount;
  }
  return count;
};
