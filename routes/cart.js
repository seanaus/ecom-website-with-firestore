const express = require("express");
// const methodOverride = require("method-override");

const { authGuard } = require("../controllers/auth");
const { authUser } = require("../core/auth");
const {
  clearCart,
  getCart,
  addToCart,
  deleteFromCart,
  increaseQuantity,
  reduceQuantity,
  formatGBP,
} = require("../cart");

const router = express.Router();
// router.use(methodOverride("_method"));

router.get("/cart", authGuard,(req, res, next) => {

  res.render("pages/cart", {
    loggedIn: authUser(),
    cart: getCart(),
    
  });
  next();
});

router.delete("/cart/:id", authGuard, (req, res, next) => {
  const id = req.params.id;
  deleteFromCart(id);
  res.redirect("/cart");
  next();
});

router.put("/cart/:id/:option", authGuard, (req, res, next) => {
  const id = req.params.id;
  const option = req.params.option;
  if (option === "ADD") {
    increaseQuantity(id);
  } else {
    reduceQuantity(id);
  }
  res.redirect("/cart");
  next();
});
router.post("/cart/:id", authGuard, async (req, res, next) => {
  const id = req.params.id;
  await addToCart(id);
  res.redirect("/cart");
  next();
});

module.exports = {
  routes: router,
};
