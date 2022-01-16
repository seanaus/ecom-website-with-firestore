const express = require("express");
const { authGuard } = require("../controllers/authCont");
const { activeUser } = require("../core/auth");
const { saveCart } = require("../core/cart");
const { loadSettings } = require("../core/settings");

const router = express.Router();

router.get("/cart", authGuard, async(req, res, next) => {
  res.render("pages/cart", {
    settings: await loadSettings(),
    user: activeUser()
  });
  next();
});
router.get("/checkout", authGuard, async(req, res, next) => {
  res.render("pages/checkout", {
    settings: await loadSettings(),
    user: activeUser()
  });
  next();
});
router.post("/saveCart", saveCart, async (req, res, next) => {
  res.redirect("/");
  next();
});
module.exports = {
  routes: router
};
