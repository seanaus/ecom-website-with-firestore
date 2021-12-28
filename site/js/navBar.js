// let _cartItemCount = 0;
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
  const items = cartItemCount();
  const cartCounter = document.getElementById("cartCounter");
  cartCounter.innerText = items;
  const loggedIn= '<%= loggedIn %>';
  const user="<%= user %>";
  console.log(`loggedIn ${loggedIn} - User ${user}`)
};
const cartItemCount = () => {
  let count = 0;
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    count = cart.itemCount;
  }
  return count
};
