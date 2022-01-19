const { activeUser } = require("../core/auth");
const { loadPage } = require("../core/page");
const { loadSettings } = require("../core/settings");
const { loadConfig } = require("../core/config");
const { slideShow } = require("../core/slideShow");

const renderHome = async (req, res, next) => {
  res.render("pages/index", {
    settings: await loadSettings(),
    user: activeUser(),
    slideShow: await slideShow(),
    navbar: await loadConfig("navbar"),
    content: await loadPage("home"),
    footer: await loadConfig("footer")
  });
  next();
};
const renderAbout = async (req, res, next) => {
  res.render("pages/about", {
    settings: await loadSettings(),
    user: activeUser(),
    navbar: await loadConfig("navbar"),
    content: await loadPage("about"),
    footer: await loadConfig("footer")
  });
  next();
};
const renderLocation = async (req, res, next) => {
  res.render("pages/location", {
    settings: await loadSettings(),
    user: activeUser(),
    navbar: await loadConfig("navbar"),
    footer: await loadConfig("footer")
  });
  next();
};
const renderLogIn = async (req, res, next) => {
  res.render("pages/logIn", {
    settings: await loadSettings(),
    user: activeUser(),
    navbar: await loadConfig("navbar"),
    footer: await loadConfig("footer")
  });
  next();
};
const renderRegistration = async (req, res, next) => {
  res.render("pages/register", {
    settings: await loadSettings(),
    user: activeUser(),
    navbar: await loadConfig("navbar"),
    footer: await loadConfig("footer")
  });
  next();
};
module.exports = {
  renderHome,
  renderAbout,
  renderLocation,
  renderLogIn,
  renderRegistration,
};