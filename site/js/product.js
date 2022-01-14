// Sean Austin
// 13/01/2022
// Get Product data from BROWSER'S localStorage, this is passed up from the node js 
// Web Server to the <script> section of the product.ejs view and saved to the 
// BROWSER's localStorage and returns the data as a cartItem
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
    formattedCost: (product.formattedCost)
  };
  return cartItem;
};
// Sean Austin
// 13/01/2022
// Format numbers to currency in GBP
const asGBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
export { getProduct, asGBP };
