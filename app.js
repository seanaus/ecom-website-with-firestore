const PORT = 8080;
const express = require("express");
const app = express();
const path = require("path");
const favicon = require('serve-favicon');
const { createNew, logIn, logOut } = require("./controllers/auth");
const { authUser } = require("./core/auth");
const { slideShow } = require("./core/slideShow");
const productRoutes = require("./routes/product");


app.use(express.static(path.join(__dirname, "site")));
app.use(favicon(path.join(__dirname, "site/favicon/", "favicon.ico")));
// mime type issue attempted fix
app.use("/matIcon/", express.static(path.join(__dirname, "node_modules/material-design-icons/iconfont")));
app.use("/matIconFix/", express.static(path.join(__dirname, "node_modules/@fontsource/material-icons")));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', productRoutes.routes);

app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/home", async (req, res) => {
  res.render("pages/index", {
    loggedIn: authUser(),
    cartCounter: 2,
    slideShow: await slideShow()
  });
});
app.get("/about", (req, res) => {
  res.render("pages/about", {
    loggedIn: authUser()
  });
});
app.get("/location", (req, res) => {
  res.render("pages/location", {
    loggedIn: authUser()
  });
});
app.get("/logIn", (req, res) => {
  res.render("pages/logIn");
});
app.post("/logIn", logIn, (req, res) => {
  res.redirect("/home");
});
app.get("/logOut", logOut, (req, res) => {
  res.redirect("/home");
});
app.get("/register", (req, res) => {
  res.render("pages/register");
});
app.post("/register", createNew, (req, res) => {
  res.redirect("/home");
});
app.get("/cart", (req, res) => {
  res.render("pages/shoppingCart", {
    cartCounter: 2
  });
});
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}.......`);
});
