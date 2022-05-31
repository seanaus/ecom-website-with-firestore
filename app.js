const PORT = 8080;
const express = require("express");
const app = express();
const path = require("path");
const favicon = require("serve-favicon");
const methodOverride = require("method-override");

const routes = require("./routes/routes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use(express.static(path.join(__dirname, "site")));
app.use(favicon(path.join(__dirname, "site/favicon/", "favicon.ico")));


app.set("view engine", "ejs");
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/matIcon/",
  express.static(
    path.join(__dirname, "node_modules/material-design-icons/iconfont")
  )
);
app.use(
  "/matIconFix/",
  express.static(
    path.join(__dirname, "node_modules/@fontsource/material-icons")
  )
);

app.use("/", routes.routes);
app.use("/", cartRoutes.routes);
app.use("/", productRoutes.routes);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}.......`);
});
