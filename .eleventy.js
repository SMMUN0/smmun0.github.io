module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./style/");
    eleventyConfig.addWatchTarget("./style/");
    eleventyConfig.addPassthroughCopy("./assets/");
    eleventyConfig.addPassthroughCopy("./scripts/");
    eleventyConfig.addWatchTarget("./scripts/");

    eleventyConfig.addShortcode("smmun_edition", function(year, edition, text) {
        return `<div class="info-div" style="background-image: url('/assets/img/editions/${year}/bg.webp'); color: #fffdfd;">
            <div class="info-title">
                SMMUN ${year}; ${edition}
            </div>
            <div class="info-text">
                ${text}
            </div>
            <div class="info-images">
                <picture>
                    <img src="/assets/img/editions/${year}/img1.webp" alt="">
                </picture>
                <picture>
                    <img src="/assets/img/editions/${year}/img2.webp" alt="">
                </picture>
                <picture>
                    <img src="/assets/img/editions/${year}/img3.webp" alt="">
                </picture>
            </div>
        </div>`;
    });

    return {
        dir: {
            input: "content",
            includes: "../_includes",
            data: "../_data",
            output: "_site"
        }
    };
};
