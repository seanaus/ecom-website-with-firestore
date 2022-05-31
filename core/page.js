"use strict";
const firebase = require("../db");
const Page = require("../models/Page");
const firestore = firebase.firestore();
let pageData = {};
const loadPage = async (pageId) => {
    try {
        const pages = await firestore.collection("pages");
        const data = await pages.get();

        if (data.empty) {
            console.log("No page content records found");
        } else {
            data.forEach((doc) => {
                if (doc.id === pageId) {
                    const page = new Page(pageId)
                    doc.data().onPage.forEach((item) => {
                        page.add(item);
                    })
                    pageData = page;
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
    return pageData;
}
module.exports = {
    loadPage
}