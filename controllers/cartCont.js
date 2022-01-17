const { activeUser } = require("../core/auth");
const { loadSettings } = require("../core/settings");

const renderCart = async (req, res, next) => {
    res.render("pages/cart", {
        settings: await loadSettings(),
        user: activeUser()
    });
    next();
};
const renderCheckOut = async (req, res, next) => {
    res.render("pages/checkout", {
        settings: await loadSettings(),
        user: activeUser()
    });
    next();
};
module.exports = {
    renderCart,
    renderCheckOut
}