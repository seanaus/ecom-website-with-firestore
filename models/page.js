class Page {
    constructor
        (
            id
        ) {
        this.id = id;
        this.onPage = [];
        this.add = (content) => {
            this.onPage.push(content);
        };

    }

}
module.exports = Page