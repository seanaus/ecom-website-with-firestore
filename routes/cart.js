const express = require("express");
// const methodOverride = require("method-override");

const { authGuard } = require("../controllers/auth");
const { activeUser } = require("../core/auth");
const { saveCart } = require("../core/cart");

const router = express.Router();
// router.use(methodOverride("_method"));

router.get("/cart", authGuard, (req, res, next) => {
  res.render("pages/cart", {
    user: activeUser()
  });
  next();
});
router.get("/checkout", authGuard, (req, res, next) => {
  res.render("pages/checkout", {
    user: activeUser()
  });
  next();
});

// router.delete("/cart/:id", authGuard, (req, res, next) => {
//   const id = req.params.id;
//   deleteFromCart(id);
//   res.redirect("/cart");
//   next();
// });

// router.put("/cart/:id/:option", authGuard, (req, res, next) => {
//   const id = req.params.id;
//   const option = req.params.option;
//   if (option === "ADD") {
//     increaseQuantity(id);
//   } else {
//     reduceQuantity(id);
//   }
//   res.redirect("/cart");
//   next();
// });
// router.post("/cart/:id", authGuard, async (req, res, next) => {
//   const id = req.params.id;
//   await addToCart(id);
//   res.redirect("/products");
//   next();
// });
router.post("/saveCart", saveCart, async (req, res, next) => {
  res.redirect("/");
  next();
});
module.exports = {
  routes: router,
};
