class Product {
    constructor(
        id,
        name,
        description,
        imageCard,
        image,
        unitCost
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageCard = imageCard;
        this.image = image;
        this.unitCost = parseFloat(unitCost);
    }

}
module.exports = Product