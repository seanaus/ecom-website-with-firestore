const express = require("express");
const { authGuard } = require("../controllers/authCont");
const { renderCart, renderCheckOut } = require("../controllers/cartCont");
const { saveCart } = require("../core/cart");

const router = express.Router();

const navToHome = (req, res, next) => {
  res.redirect("/");
  next();
};

router.get("/cart", authGuard, renderCart);
router.get("/checkout", authGuard, renderCheckOut);
router.post("/saveCart", saveCart, navToHome);

module.exports = {
  routes: router
};
