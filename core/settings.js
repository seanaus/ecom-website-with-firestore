"use strict";
const firebase = require("../db");
const Settings = require("../models/settings");
const firestore = firebase.firestore();

const loadSettings = async () => {
    try {
        let settings = [];
        const data = await firestore.collection("settings");
        const docs = await data.get();
        if (docs.empty) {
            console.log("ERROR: No settings data found");
        } else {
            docs.forEach((doc) => {
                const tmp = new Settings(
                    doc.id,
                    doc.data().projectName,
                    doc.data().vatPercentage
                );
                settings.push(tmp);
            });
            // console.log(JSON.stringify(settings[0]));
            return settings[0];
        }
    } catch (error) {
        console.log(error.message);
    }
};
module.exports = {
    loadSettings
};
