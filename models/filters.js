class Filters {
    constructor()
    {
        this.levels = [];
        this.items = [];
        this.add = (item) => {
            this.items.push(item);
            this.cacheLevel(item.level)
        };
        this.cacheLevel = (level) => {
            if (!this.levels.includes(level)) {
                this.levels.push(level)   
            }
        };

    }

}
module.exports = Filters