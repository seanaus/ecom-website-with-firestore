class ProductGroup {
    constructor(
        id,
        productLevel01Id,
        productLevel02Id,
        productLevel03Id,
        productId
    ) {
        this.id = id;
        this.productLevel01Id = productLevel01Id;
        this.productLevel02Id = productLevel02Id;
        this.productLevel03Id = productLevel03Id;
        this.productId = productId;
    }

}
module.exports = ProductGroup