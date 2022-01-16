const { activeUser } = require("../core/auth");
const { loadSettings } = require("../core/settings");
const { slideShow } = require("../core/slideShow");

const renderHome = async (req, res, next) => {
  res.render("pages/index", {
    settings: await loadSettings(),
    user: activeUser(),
    slideShow: await slideShow(),
  });
  next();
};
const renderAbout = async (req, res, next) => {
  res.render("pages/about", {
    settings: await loadSettings(),
    user: activeUser(),
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
