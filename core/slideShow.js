"use strict";
const firebase = require("../db");
const firestore = firebase.firestore();
const Slide = require("../models/slide");

const slideShow = async () => {
    let slideArray = [];
    try {
        const slides = await firestore.collection('slideShow');
        const data = await slides.get();
        if (data.empty) {
            console.log('No slide records found');
        } else {
            data.forEach(doc => {
                const slide = new Slide(
                    doc.id,
                    doc.data().image,
                    doc.data().caption
                );
                slideArray.push(slide);
            });
        }
    } catch (error) {
        console.log(error.message);
    }

    if (slideArray) {
        return slideArray
    } else {
        return new Slide("-1", "-1", "-1")
    }
}

module.exports = {
    slideShow
}