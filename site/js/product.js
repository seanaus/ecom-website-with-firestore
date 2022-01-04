// const _id = document.getElementById("id").innerText.trim();
// const _name = document.getElementById("name").innerText.trim();
// const _imageURL = document.getElementById("imageURL").innerText.trim();
// const _description = document.getElementById("description").innerText.trim();
// const _unitCost = parseFloat(
//   document.getElementById("unitCost").innerText.trim()
// );
// const btnAddToCart = document.getElementById("addToCart");

// let _product = {
//   id: _id,
//   name: _name,
//   imageURL: _imageURL,
//   unitCost: _unitCost,
// };
//localStorage.setItem("product", JSON.stringify(_product));
const getProduct = () => {
  const product = JSON.parse(localStorage.getItem("product"));
  const cartItem = {
    id: product.id,
    name: product.name,
    imageCard: product.imageCard,
    unitCost: parseFloat(product.unitCost),
    description: product.description,
    quantity: 1,
    cost: parseFloat(product.unitCost),
    formattedCost: String(asGBP.format(product.unitCost)),
  };
  return cartItem;
};
const asGBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
export { getProduct, asGBP };
