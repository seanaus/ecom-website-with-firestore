"use strict";
const firebase = require("../db");
const Product = require("../models/product");
const firestore = firebase.firestore();

// const addProduct = async (req, res, next) => {
//     try {
//         const data = req.body;
//         await firestore.collection('products').doc().set(data);
//         res.send('Record saved successfuly');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

const products = async () => {
    const productsArray = [];
    try {
        const products = await firestore.collection('products');
        const data = await products.get();

        if (data.empty) {
            console.log('No product records found');
        } else {
            data.forEach(doc => {
                const product = new Product(
                    doc.id,
                    doc.data().name,
                    doc.data().description,
                    doc.data().imageCard,
                    doc.data().image,
                    doc.data().unitCost
                );
                productsArray.push(product);
            });
        }
    } catch (error) {
        console.log(error.message);
    }
    if (productsArray.length) {
        return productsArray
    } else {
        return false
    }
}

const productById = async (id) => {

    let found = new Product("-1", "-1", "-1", "-1", "-1", "-1");

    try {
        const product = await firestore.collection('products').doc(id);
        const data = await product.get();
        if (!data.exists) {
            console.log('Product with the given ID not found');
        } else {
            found.id = data.data().id;
            found.name = data.data().name,
                found.description = data.data().description,
                found.imageCard = data.data().imageCard,
                found.image = data.data().image,
                found.unitCost = data.data().unitCost
        }
    } catch (error) {
        console.log(error.message);
    }
    if (found.id !== "-1") {
        return found
    } else {
        return false
    }
}

// const updateProduct = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const data = req.body;
//         const product = await firestore.collection('products').doc(id);
//         await product.update(data);
//         res.send('Product record updated successfuly');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const deleteProduct = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         await firestore.collection('products').doc(id).delete();
//         res.send('Record deleted successfuly');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

module.exports = {
    productById,
    products
}