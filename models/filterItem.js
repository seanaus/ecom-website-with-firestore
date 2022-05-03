class FilterItem {
    constructor
        (
            id,
            level,
            name,
            parentId
        )
        {
            this.id = id;
            this.level = level;
            this.name = name;
            this.parentId = parentId;
            this.children = [];
        };

}
module.exports = FilterItem