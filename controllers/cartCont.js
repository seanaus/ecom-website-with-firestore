const { activeUser } = require("../core/auth");
const { loadSettings } = require("../core/settings");
const { loadConfig } = require("../core/config");

const renderCart = async (req, res, next) => {
    res.render("pages/cart", {
        settings: await loadSettings(),
        navbar: await loadConfig("navbar"),
        footer: await loadConfig("footer"),
        user: activeUser()
    });
    next();
};
const renderCheckOut = async (req, res, next) => {
    res.render("pages/checkout", {
        settings: await loadSettings(),
        navbar: await loadConfig("navbar"),
        footer: await loadConfig("footer"),
        user: activeUser()
    });
    next();
};
module.exports = {
    renderCart,
    renderCheckOut
}