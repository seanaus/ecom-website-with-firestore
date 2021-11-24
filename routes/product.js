const express = require("express");
const router = express.Router();
const { getProducts, getProduct } = require("../controllers/product");
const { authGuard } = require("../controllers/auth");

router.get("/products", authGuard, getProducts);
router.get("/product/:id", authGuard, getProduct);

module.exports = {
  routes: router
};
