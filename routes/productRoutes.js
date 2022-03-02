const express = require("express");
const router = express.Router();
const { renderProducts, renderProduct } = require("../controllers/productCont");
const { authGuard } = require("../controllers/authCont");

router.get("/products", authGuard, renderProducts);
// router.get("/productsFiltered", authGuard, renderFilteredProducts);
router.get("/product/:id", authGuard, renderProduct);

module.exports = {
  routes: router,
};
