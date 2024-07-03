module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./style/");
    eleventyConfig.addWatchTarget("./style/");
    eleventyConfig.addPassthroughCopy("./assets/");
    eleventyConfig.addPassthroughCopy("./scripts/");
    eleventyConfig.addWatchTarget("./scripts/");

    eleventyConfig.addShortcode("smmun_edition", function(year, edition, text) {
        let color = "#fffdfd";
        if (year == 2016) {
            color = "#042654";
        }

        return `<article class="info-div" style="background-image: url('/assets/img/ediciones/${year}/bg.webp'); color:${color};">
            <h3 class="info-title">
                SMMUN ${year}; ${edition}
            </h3>
            <p class="info-text">
                ${text}
            </p>
            <div class="info-images">
                <figure>
                    <img src="/assets/img/ediciones/${year}/img1.webp" alt="Foto  de la edición ${year} del SMMUN.">
                </figure>
                <figure>
                    <img src="/assets/img/ediciones/${year}/img2.webp" alt="Foto  de la edición ${year} del SMMUN.">
                </figure>
                <figure>
                    <img src="/assets/img/ediciones/${year}/img3.webp" alt="Foto  de la edición ${year} del SMMUN.">
                </figure>
            </div>
        </article>`;
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
