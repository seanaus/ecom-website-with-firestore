const { activeUser } = require("../core/auth");
const { loadPage } = require("../core/page");
const { loadSettings } = require("../core/settings");
const { slideShow } = require("../core/slideShow");

const renderHome = async (req, res, next) => {
  res.render("pages/index", {
    settings: await loadSettings(),
    user: activeUser(),
    slideShow: await slideShow(),
    content: await loadPage("home")
  });
  next();
};
const renderAbout = async (req, res, next) => {
  res.render("pages/about", {
    settings: await loadSettings(),
    user: activeUser(),
    content: await loadPage("about")
  });
  next();
};
const renderLocation = async (req, res, next) => {
  res.render("pages/location", {
    settings: await loadSettings(),
    user: activeUser(),
  });
  next();
};
const renderLogIn = async (req, res, next) => {
  res.render("pages/logIn", {
    settings: await loadSettings(),
    user: activeUser(),
  });
  next();
};
const renderRegistration = async (req, res, next) => {
  res.render("pages/register", {
    settings: await loadSettings(),
    user: activeUser(),
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
