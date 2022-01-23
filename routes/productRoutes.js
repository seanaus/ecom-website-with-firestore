const renderProducts = async (req, res, next) => {
  const productArray = await loadProducts();
  res.render("pages/products", {
    settings: await loadSettings(),
    navbar: await loadConfig("navbar"),
    footer: await loadConfig("footer"),
    user: activeUser(),
    products: productArray,
    cart: getCart(),
  });
  next();
};