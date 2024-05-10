module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./style/");
    eleventyConfig.addWatchTarget("./style/");
    eleventyConfig.addPassthroughCopy("./assets/");
    eleventyConfig.addPassthroughCopy("./scripts/");
    eleventyConfig.addWatchTarget("./scripts/");

    return {
        dir: {
            input: "content",
            includes: "../_includes",
            data: "../_data",
            output: "_site"
        }
    };
};
