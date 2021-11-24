"use strict";
const firebase = require("../db");
const Product = require("../models/product");
const firestore = firebase.firestore();
const { authUser } = require("../core/auth");
const { products, productById } = require("../core/product");

const getProducts = async (req, res, next) => {

    const productArray = await products();

    res.render("pages/products", {
        loggedIn: authUser(),
        products: productArray,
    });

    next();
}

const getProduct = async (req, res, next) => {

    const id = req.params.id;
    const product = await productById(id);

    if (!product) {
        console.log('Product with the given ID not found');
    } else {
        res.render("pages/product", {
            loggedIn: authUser(),
            product: product,
        });
    }

    next();
}
module.exports = {
    getProducts,
    getProduct
}