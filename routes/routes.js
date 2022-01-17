const express = require("express");
const router = express.Router();
const { createNew, logIn, logOut } = require("../controllers/authCont");
const {
  renderHome,
  renderAbout,
  renderLocation,
  renderLogIn,
  renderRegistration,
} = require("../controllers/routeCont");

const navToHome = (req, res, next) => {
  res.redirect("/");
  next();
};
router.get(["/", "/home"], renderHome);
router.get("/about", renderAbout);
router.get("/location", renderLocation);
router.get("/logIn", renderLogIn);
router.get("/logOut", logOut, navToHome);
router.get("/register", renderRegistration);
router.post("/logIn", logIn, navToHome);
router.post("/register", createNew, navToHome);

module.exports = {
  routes: router,
};
