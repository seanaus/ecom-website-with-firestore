const express = require("express");
const { createNew, logIn, logOut } = require("../controllers/auth");
const { authUser, activeUser } = require("../core/auth");
const { loadSettings } = require("../core/settings");
const { slideShow } = require("../core/slideShow");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/home");
  next();
});
router.get("/home", async (req, res, next) => {
  res.render("pages/index", {
    settings: await loadSettings(),
    user: activeUser(),
    slideShow: await slideShow(),
  });
  next();
});
router.get("/about", async (req, res, next) => {
  res.render("pages/about", {
    settings: await loadSettings(),
    user: activeUser()
  });
  next();
});
router.get("/location", async (req, res, next) => {
  res.render("pages/location", {
    settings: await loadSettings(),
    user: activeUser()
  });
  next();
});
router.get("/logIn", async (req, res, next) => {
  res.render("pages/logIn", {
    settings: await loadSettings(),
    user: activeUser(),
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
router.get("/register", async (req, res, next) => {
  res.render("pages/register", {
    settings: await loadSettings(),
    user: activeUser()
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
