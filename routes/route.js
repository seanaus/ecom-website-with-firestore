const express = require("express");
const { createNew, logIn, logOut } = require("../controllers/auth");
const { authUser, activeUser } = require("../core/auth");
const { slideShow } = require("../core/slideShow");
// const { getCart } = require("../cart");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/home");
  next();
});
router.get("/home", async (req, res, next) => {
  res.render("pages/index", {
    loggedIn: authUser(),
    user: activeUser(),
    slideShow: await slideShow(),
  });
  next();
});
router.get("/about", (req, res, next) => {
  res.render("pages/about", {
    loggedIn: authUser(),
    user: activeUser(),
  });
  next();
});
router.get("/location", (req, res, next) => {
  res.render("pages/location", {
    loggedIn: authUser(),
    user: activeUser()
  });
  next();
});
router.get("/logIn", (req, res, next) => {
  res.render("pages/logIn", {
    loggedIn: authUser(),
  });
  next();
});
router.post("/logIn", logIn, (req, res, next) => {
  res.redirect("/home");
  next();
});
router.get("/logOut", logOut, (req, res, next) => {
  res.redirect("/home");
  next();
});
router.get("/register", (req, res, next) => {
  res.render("pages/register", {
    loggedIn: authUser(),
  });
  next();
});
router.post("/register", createNew, (req, res, next) => {
  res.redirect("/home");
  next();
});
module.exports = {
  routes: router,
};
