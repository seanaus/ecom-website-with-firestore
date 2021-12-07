const express = require("express");
const methodOverride = require('method-override');
const { getProducts, getProduct } = require("../controllers/product");
const { authGuard } = require("../controllers/auth");

const router = express.Router();
router.use(methodOverride('_method'));

router.get("/cart", authGuard, (req, res, next) => {
  res.render("pages/cart", { cart: req.cart });
  next();
});

router.delete("/cart/:id", authGuard, (req, res, next) => {
  const id = req.params.id;
  cart.deleteItem(id);
  res.redirect("/cart");
  next();
});
router.put("/cart/:id/:option", authGuard, (req, res, next) => {
  const id = req.params.id;
  const option = req.params.option;
  if (option === "ADD") {
    cart.increaseQuantity(id);
  } else {
    cart.reduceQuantity(id);
  }
  res.redirect("/cart");
  next();
});
router.post("/cart/:id", authGuard, getProduct, (req, res, next) => {

  const id = req.params.id;
  console.log("Added " + id);
  // cart.addItem(id);
  // res.redirect("/");
  // next();
});

module.exports = {
  routes: router,
};
