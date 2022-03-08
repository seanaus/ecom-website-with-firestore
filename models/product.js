class Product {
    constructor(
        id,
        productLevel01Id,
        productLevel02Id,
        productLevel03Id,
        name,
        description,
        imageCard,
        image,
        unitCost,
        formattedCost
    ) {
        this.id = id;
        this.productLevel01Id = productLevel01Id;
        this.productLevel02Id = productLevel02Id;
        this.productLevel03Id = productLevel03Id;
        this.name = name;
        this.description = description;
        this.imageCard = imageCard;
        this.image = image;
        this.unitCost = parseFloat(unitCost);
        this.formattedCost = formattedCost
    }

}
module.exports = Product