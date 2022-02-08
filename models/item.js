class Item {
  constructor(id, productLevels) {
    this.id = id;
    this.productLevels = productLevels;
    this.productLevelArray = [this.productLevels - 1];
  }
  // productLevel = productLevel01 || productLevel02 ..etc
  addProductLevel = (productLevel, value) => {
    // console.log("1");
    const productLevelIndex = parseInt(productLevel.slice(-2)) - 1;
    // console.log("2");
    console.log(productLevel);
    console.log(productLevelIndex);
    //const index = productLevelIndex(this.productLevelArray[productLevelIndex].productLevel.id, value.id);
    // console.log("3");
    // if (index >= 0) {
    // value = value + `,{ id: ${this.id} }`
    this.productLevelArray[productLevelIndex] = value;
    // }
  };

  productLevelIndex = (productLevel, value) => {
    let index = -1;
    console.log("1:1");
    if (productLevel.isArray) {
      for (i = 0; i < productLevel.length; i++) {
        if (productLevel[i].id === value) {
          index = i;
        }
      }
    }
    return index;
  };
}
module.exports = Item;
