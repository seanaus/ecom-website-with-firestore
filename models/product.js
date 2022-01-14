class Product {
    constructor(
        id,
        name,
        description,
        imageCard,
        image,
        unitCost,
        formattedCost
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageCard = imageCard;
        this.image = image;
        this.unitCost = parseFloat(unitCost);
        this.formattedCost = formattedCost
    }

}
module.exports = Product