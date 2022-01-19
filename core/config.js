"use strict";
const config = require("../config");
const firebase = require("../db");
const Config = require("../models/config");
const firestore = firebase.firestore();
let configData = {};
const loadConfig = async (id) => {
    try {
        const items = await firestore.collection("configuration");
        const data = await items.get();

        if (data.empty) {
            console.log("No page configuration data found");
        } else {
            data.forEach((doc) => {
                if (doc.id === id) {
                    const config = new Config(id)
                    doc.data().items.forEach((item) => {
                        config.add(item);
                    })
                    configData = config;
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
    return configData;
}
module.exports = {
    loadConfig
}