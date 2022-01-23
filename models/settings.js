class Settings {
    constructor(
        id,
        projectName,
        profitMetricPercentage,
        pageWidthMaxPercentage

    ) {
        this.id = id;
        this.projectName = projectName;
        this.profitMetricPercentage = profitMetricPercentage;
        this.pageWidthMaxPercentage = pageWidthMaxPercentage;
    }
}
module.exports = Settings