const express = require("express");
const router = express.Router();
const { renderProducts, renderProduct } = require("../controllers/product");
const { authGuard } = require("../controllers/auth");

router.get("/products", authGuard, renderProducts);
router.get("/product/:id", authGuard, renderProduct);

module.exports = {
  routes: router
};
